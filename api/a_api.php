<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow specific methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers

// Database connection parameters
$serverName = "DESKTOP-E17B10B\SQLEXPRESS";
$connectionOptions = array(
    "Database" => "SOUL30",
    "Uid" => "sa",
    "PWD" => "sa@123"
);
// Establish the connection
$conn = sqlsrv_connect($serverName, $connectionOptions);

// Check connection
if ($conn === false) {
    $response['error'] = "Connection failed: " . print_r(sqlsrv_errors(), true);
    echo json_encode($response);
    exit;
}

// Get the current date
date_default_timezone_set('Asia/Kolkata'); // Replace with your desired time zone
$date = date('Y-m-d');

// Prepare and execute the SQL statement
// $sql = "SELECT * FROM a_display";
// $sql = "SELECT TOP 5 UPPER(mem_id) AS mem_id, LOWER(fullname) AS fullname, CONVERT(varchar, Login_time, 121) AS Login_time, CONVERT(varchar, Logout_time, 121) AS Logout_time FROM t_memlogV WHERE CONVERT(DATE, Login_time) = ? ORDER BY Login_time DESC";
$sql = "WITH AggregatedResults AS (
    SELECT
        m.mem_id,
        CONCAT(m.mem_firstnm, ' ', m.mem_lstnm) AS fullname,
        t.Login_time,
        t.Logout_time
    FROM
        t_memlog AS t
    LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd
    LEFT JOIN m_fcltydept AS f ON f.Fclty_dept_cd = m.mem_dept
) 
SELECT TOP 5 
    UPPER(mem_id) AS mem_id, 
    LOWER(fullname) AS fullname, 
    CONVERT(varchar, Login_time, 121) AS Login_time, 
    CONVERT(varchar, Logout_time, 121) AS Logout_time 
FROM AggregatedResults AS ar
WHERE CONVERT(DATE, Login_time) = ? 
ORDER BY 
    Login_time DESC";

$params = array($date);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    $response['error'] = "Query failed: " . print_r(sqlsrv_errors(), true);
    echo json_encode($response);
    exit;
}

// Fetch and display the result
$data = array();
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {

    // $formattedDate = date("Y-m-d H:i:s", strtotime($row["Login_time"]));

    // Check for NULL Logout_time and replace with space
    if (is_null($row['Logout_time'])) {
        $row['Logout_time'] = ' ';
    }

    $data[] = array(
        "mem_id" => $row['mem_id'],
        // "Login_time" => $formattedDate,
        "Login_time" => $row['Login_time'],
        "Logout_time" => $row['Logout_time'],
        "fullname" => $row['fullname'],
        "Location" => 'Library Main Entrance'
    );
    // $data[] = "<tr><td>" . $row['mem_id'] . "</td><td>" . $row['fullname'] . "</td><td>" . $row['Login_time'] . "</td><td>" . $row['Logout_time'] . "</td><td>Library Main Entrance</td></tr>";
    // $data[] = "<tr><td>" . $row['mem_id']. "</td><td>" . $row['fullname']. "</td><td>" . $row['Login_time']. "</td></tr>";
}

$response['data'] = $data;
echo json_encode($response);

// Free statement and close connection
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>