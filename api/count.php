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
$sql = "SELECT COUNT(Login_time) AS count FROM t_memlog WHERE CONVERT(DATE, Login_time) = ?";

$params = array($date);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    $response['error'] = "Query failed: " . print_r(sqlsrv_errors(), true);
    echo json_encode($response);
    exit;
}

// Fetch and display the result
$row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
$data = $row['count'];

echo json_encode($data);

// Free statement and close connection
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>