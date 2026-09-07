<?php
// Enable error reporting for debugging
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');

// date_default_timezone_set('Asia/Kolkata');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if the request method is POST
    if (isset($_POST['subj']) && isset($_POST['email'])) {
        
        $serverName = "DESKTOP-E17B10B\SQLEXPRESS";
        $connectionOptions = array(
            "Database" => "SOUL30",
            "Uid" => "sa",
            "PWD" => "sa@123"
        );
        $conn = sqlsrv_connect($serverName, $connectionOptions);

        if ($conn === false) {
            echo "Connection failed: " . print_r(sqlsrv_errors(), true);
            exit;
        }

        $sql = "SELECT mem_email AS emails FROM m_member WHERE mem_id='bsc/2023/09'";
        $stmt = sqlsrv_query($conn, $sql);

        if ($stmt === false) {
            echo "Query failed: " . print_r(sqlsrv_errors(), true);
            exit;
        }

        // Fetch all emails
        $emails = [];
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $emails[] = $row['emails'];
            // $count = $row['count'];
        }

        // Free statement and close connection
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($conn);

        $subj = $_POST['subj'];
        $email = $_POST['email'];
        $headers = "From: carc5527@gmail.com";
        // $headers = "From: rahacollegecentrallibrary@gmail.com";

        $to = implode(",", $emails);

        // Send email to all recipients
        if (mail($to, $subj, $email, $headers)) {
            echo "Successfull";
            // echo "Successfull - " . $count;
        } else {
            echo "drop out";
        }
    }
}
?>