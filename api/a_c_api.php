<?php
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
    echo json_encode($data);
    exit;
}

// Get the current date
date_default_timezone_set('Asia/Kolkata'); // Replace with your desired time zone
$date = date('Y-m-d');
// Prepare and execute the SQL statement
$sql1 = "SELECT COUNT(LogID) as total FROM t_memlog WHERE CONVERT(DATE, Login_time) = ?";
$params1= array($date);
$stmt1 = sqlsrv_query($conn, $sql1, $params1);

if ($stmt1 === false) {
    $data['error'] = "Query failed: " . print_r(sqlsrv_errors(), true);
    echo json_encode($data);
    exit;
}
$row1 = sqlsrv_fetch_array($stmt1, SQLSRV_FETCH_ASSOC);

// FEMALE COUNTER
$sql2 = "SELECT COUNT(LogID) as total FROM t_memlog as t LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd WHERE m.mem_gender = 'female' AND CONVERT(DATE, Login_time) = ?";
$params2 = array($date);
$stmt2 = sqlsrv_query($conn, $sql2, $params2);
if($stmt2 === false){
    $data['error'] = "Query failed:" . print_r(sqlsrv_errors(), true);
    echo json_encode($data);
    exit;
}
$row2 = sqlsrv_fetch_array($stmt2, SQLSRV_FETCH_ASSOC);


$sql3 = "SELECT COUNT(LogID) AS total FROM t_memlog AS t LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd WHERE m.mem_gender = 'male' AND CONVERT(DATE, Login_time) = ?";
$params3 = array($date);
$stmt3 = sqlsrv_query($conn, $sql3, $params3);
if($stmt3 === false) {
    $data['error'] = "Query failed:" . print_r(sqlsrv_errors(), true);
    echo json_encode($data);
    exit;
}
$row3 = sqlsrv_fetch_array($stmt3, SQLSRV_FETCH_ASSOC);

// STUDENTS COUNTER
$sql4 = "SELECT COUNT(LogID) AS total FROM t_memlog AS t LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd WHERE m.mem_id NOT LIKE 'RLBCL/%' AND CONVERT(DATE, Login_time) = ?";
$params4 = array($date);
$stmt4 = sqlsrv_query($conn, $sql4, $params4);
if($stmt4 === false) {
    $data['error'] = "Query failed:" . print_r(sqlsrv_errors(), true);
    echo json_encode($data);
    exit;
}
$row4 = sqlsrv_fetch_array($stmt4, SQLSRV_FETCH_ASSOC);

// TEACHERS COUNTER
$sql5 = "SELECT COUNT(LogID) AS total FROM t_memlog AS t LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd WHERE m.mem_id LIKE 'RLBCL/T%' AND CONVERT(DATE, Login_time) = ?";
$params5 = array($date);
$stmt5 = sqlsrv_query($conn, $sql5, $params5);
if($stmt5 === false) {
    $data['error'] = "Query failed:" . print_r(sqlsrv_errors(), true);
    echo json_encode($data);
    exit;
}
$row5 = sqlsrv_fetch_array($stmt5, SQLSRV_FETCH_ASSOC);

// OTHERS COUNTER
$sql6 = "WITH AggregatedResults AS (
    SELECT 
    t.LogID, t.mem_cd, m.mem_id, t.Login_time
    FROM 
        t_memlog AS t
    LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd
    WHERE m.mem_id NOT LIKE 'RLBCL/T%'
)
    SELECT COUNT(LogID) AS total
    FROM 
        AggregatedResults AS ar
    WHERE  ar.mem_id LIKE 'RLBCL/%' AND CONVERT(DATE, ar.Login_time) = ?";
$params6 = array($date);
$stmt6 = sqlsrv_query($conn, $sql6, $params6);
if($stmt6 === false){
    $data['error'] = "Query failed:" . print_r(sqlsrv_errors(), true);
    echo json_encode($data);
    exit;
}
$row6 = sqlsrv_fetch_array($stmt6, SQLSRV_FETCH_ASSOC);

$data = array('visitors' => $row1['total'], 'female' => $row2['total'], 'male' => $row3['total'], 'students' => $row4['total'], 'teachers' => $row5['total'], 'others' => $row6['total']);

// $response['data'] = $data;
echo json_encode($data);

// Free statement and close connection
sqlsrv_free_stmt($stmt1);
sqlsrv_free_stmt($stmt2);
sqlsrv_free_stmt($stmt3);
sqlsrv_free_stmt($stmt4);
sqlsrv_free_stmt($stmt5);
sqlsrv_free_stmt($stmt6);
sqlsrv_close($conn);
?>