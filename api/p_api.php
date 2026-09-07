<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow specific methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers

// function getCurrentDateTime(){
//     return date("Y/m/d H:i:s.000");
// }
date_default_timezone_set('Asia/Kolkata'); // Replace with your desired time zone

// $s_conn = new mysqli('localhost', 'root', '', 'dashboard');
// // Check connection
// if ($s_conn->connect_error) {
//     die("Connection failed: " . $s_conn->connect_error);
// }
// $sql = "SELECT id, header FROM fdashboard";
// $result = $conn->query($sql);
// $row = $result->fetch_assoc();

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['q'])) {

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
        $data['error'] = "Connection failed: " . print_r(sqlsrv_errors(), true);
        echo json_encode($data);
        exit;
    }

    // awarded users
    function a($s) {
        $s_conn = new mysqli('localhost', 'root', '', 'dashboard');
        // Check connection
        if ($s_conn->connect_error) {
            die("Connection failed: " . $s_conn->connect_error);
        }
        $s_sql = "SELECT id, details FROM dashboard WHERE id=$s";
        $s_result = $s_conn->query($s_sql);
        $s_row = $s_result->fetch_assoc();
        $a = $s_row['details'];
        return $a;
    }

    $query = $_GET['q'];
    if ($query === '1') {
        // $query = '2025-01-16';
        $starting = '2024-01-16';
        $ending = '2025-09-16';
        $a = a('1');
        $b = a('2');
        $final = "WHERE CONVERT(DATE, t.Login_time) BETWEEN '$starting' AND '$ending' AND NOT mem_id='$a' AND NOT mem_id='$b'";
    } elseif ($query === '2') {
        $a = a('1');
        $final = "WHERE mem_id='$a'";
    } elseif ($query === '3') {
        $a = a('2');
        $final = "WHERE mem_id='$a'";
    } else {
        exit;
    }
    // echo $query;
    // $querys = $_GET['qs'];
    function main($conn, $final) {

        // Prepare and execute the SQL statement
        $sql = "WITH AggregatedResults AS (
            SELECT 
                m.mem_id, 
                t.mem_cd, 
                MIN(CONVERT(DATE, t.Login_time)) AS Login_time, 
                MAX(CONVERT(DATE, t.Logout_time)) AS Logout_time, 
                CONCAT(m.mem_firstnm, ' ', m.mem_lstnm) AS fullname,
                COUNT(t.mem_cd) AS mem_cd_count
            FROM 
                t_memlog AS t
            LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd
            $final
            --WHERE CONVERT(DATE, t.Login_time) BETWEEN ? AND ?
            GROUP BY
                m.mem_id,
                t.mem_cd,
                -- CONVERT(DATE, t.Login_time),
                -- CONVERT(DATE, t.Logout_time),
                m.mem_firstnm,
                m.mem_lstnm
            HAVING
                COUNT(t.mem_cd) > 0
        )
        SELECT TOP 1 
            ar.mem_id, 
            ar.mem_cd, 
            ar.Login_time, 
            ar.Logout_time, 
            ar.fullname,
            p.member_photo
        FROM 
            AggregatedResults AS ar
        LEFT JOIN mem_photo AS p ON p.mem_cd = ar.mem_cd
        ORDER BY
            ar.mem_cd_count DESC";
        $stmt = sqlsrv_query($conn, $sql);

        if ($stmt === false) {
            $response['error'] = "Query failed: " . print_r(sqlsrv_errors(), true);
            echo json_encode($response);
            exit;
        }

        // Fetch and display the result
        $data = array();
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            if (isset($row['member_photo']) && $row['member_photo'] !== '') {
                $row['member_photo'] = 'data:image/png;base64,' . base64_encode($row['member_photo']);
            }
            $data = array("mem_id" => $row['mem_id'], "mem_cd" => $row['mem_cd'], "Login_time" => $row['Login_time'], "Logout_time" => $row['Logout_time'], "fullname" => $row['fullname'], "member_photo" => $row['member_photo']);
            return $data;
        }
        sqlsrv_free_stmt($stmt);
        return array("mem_id" => 'BSC/2023/09', "mem_cd" => 'BASDFF23201', "Login_time" => '2025-01-01', "Logout_time" => '2025-12-01', "fullname" => 'Firstname Lastnames', 'member_photo' => 'icon/img_avatar.png');

    }
    $y = '2025-02-16';
    $main = main($conn, $final);
    echo json_encode($main);
    // Free statement and close connection
    sqlsrv_close($conn);
}
?>