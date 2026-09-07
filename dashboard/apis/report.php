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

// Total sundays count on month function
function countSundays($year, $month) {
    // Get the total number of days in the month
    $totalDays = cal_days_in_month(CAL_GREGORIAN, $month, $year);
    // Counter for Sundays
    $sundayCount = 0;
    // Loop through all the days in the month
    for ($day = 1; $day <= $totalDays; $day++) {
        // Get the day of the week for this particular date
        $date = strtotime("$year-$month-$day");
        
        // If it's a Sunday, increment the counter
        if (date('l', $date) == 'Sunday') {
            $sundayCount++;
        }
    }
    return $sundayCount;
}

// previous year count for students
function previousstds($conn, $f, $s){
    $sql = "SELECT COUNT(LogID) as total FROM t_memlog as t LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd WHERE m.mem_id NOT LIKE 'rlbcl/%' AND t.Login_time BETWEEN ? AND ?";
    $params = array($f, $s);
    $stmt = sqlsrv_query($conn, $sql, $params);
    if($stmt === false){
        $data['error'] = "Query failed:" . print_r(sqlsrv_errors(), true);
        echo json_encode($data);
        exit;
    }

    return $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC); sqlsrv_free_stmt($stmt);
}
// previous year count for teachers
function previousteach($conn, $f, $s){
    $sql = "WITH AggregatedResults AS (
        SELECT 
        t.LogID, t.mem_cd, m.mem_id, t.Login_time
        FROM 
            t_memlog AS t
        LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd
        WHERE m.mem_id NOT LIKE 'RLBCL/NT%'
    )
        SELECT COUNT(LogID) AS total
        FROM 
            AggregatedResults AS ar
        WHERE  ar.mem_id LIKE 'RLBCL/%' AND CONVERT(DATE, ar.Login_time) BETWEEN ? AND ?";
    $params = array($f, $s);
    $stmt = sqlsrv_query($conn, $sql, $params);
    if($stmt === false){
        $data['error'] = "Query failed:" . print_r(sqlsrv_errors(), true);
        echo json_encode($data);
        exit;
    }

    return $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC); sqlsrv_free_stmt($stmt);
}

// Current year count for students
function currentstds($conn, $f, $s){
    $sql = "SELECT COUNT(LogID) as total FROM t_memlog as t LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd WHERE m.mem_id NOT LIKE 'rlbcl/%' AND CONVERT(DATE, t.Login_time) BETWEEN ? AND ?";
    $params = array($f, $s);
    $stmt = sqlsrv_query($conn, $sql, $params);
    if($stmt === false){
        $data['error'] = "Query failed:" . print_r(sqlsrv_errors(), true);
        echo json_encode($data);
        exit;
    }

    return $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC); sqlsrv_free_stmt($stmt);
}
// Current year count for teachers
function currentteach($conn, $f, $s){
    $sql = "WITH AggregatedResults AS (
        SELECT 
        t.LogID, t.mem_cd, m.mem_id, t.Login_time
        FROM 
            t_memlog AS t
        LEFT JOIN m_member AS m ON m.mem_cd = t.mem_cd
        WHERE m.mem_id NOT LIKE 'RLBCL/NT%'
    )
        SELECT COUNT(LogID) AS total
        FROM 
            AggregatedResults AS ar
        WHERE  ar.mem_id LIKE 'RLBCL/%' AND CONVERT(DATE, ar.Login_time) BETWEEN ? AND ?";
    $params = array($f, $s);
    $stmt = sqlsrv_query($conn, $sql, $params);
    if($stmt === false){
        $data['error'] = "Query failed:" . print_r(sqlsrv_errors(), true);
        echo json_encode($data);
        exit;
    }

    return $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC); sqlsrv_free_stmt($stmt);
}



function calculation($conn) {
    $year = '2025';
    // $year = date('Y');
    $prevyear = $year - 1;
    // echo $prevyear;
    function month($prevyear, $month) {
        // $year = 2025;
        // $month = 2; // January
        $totalDays = cal_days_in_month(CAL_GREGORIAN, $month, $prevyear);
        return $prevyear.'-'.$month.'-'.$totalDays;
    }
    function wdays($prevyear, $month) {
        // $year = 2025;
        // $month = 2; // January
        $workingdays = cal_days_in_month(CAL_GREGORIAN, $month, $prevyear) - 4;
        return $workingdays;
    }

    $psjuly = previousstds($conn, $prevyear.'-07-01', month($prevyear, '7'));
    $psaugust = previousstds($conn, $prevyear.'-08-01', month($prevyear, '8'));
    $psseptember = previousstds($conn, $prevyear.'-09-01', month($prevyear, '9'));
    $psoctober = previousstds($conn, $prevyear.'-10-01', month($prevyear, '10'));
    $psnovember = previousstds($conn, $prevyear.'-11-01', month($prevyear, '11'));
    $psdecember = previousstds($conn, $prevyear.'-12-01', month($prevyear, '12'));
    // previous teachers
    $ptjuly = previousteach($conn, $prevyear.'-07-01', month($prevyear, '7'));
    $ptaugust = previousteach($conn, $prevyear.'-08-01', month($prevyear, '8'));
    $ptseptember = previousteach($conn, $prevyear.'-09-01', month($prevyear, '9'));
    $ptoctober = previousteach($conn, $prevyear.'-10-01', month($prevyear, '10'));
    $ptnovember = previousteach($conn, $prevyear.'-11-01', month($prevyear, '11'));
    $ptdecember = previousteach($conn, $prevyear.'-12-01', month($prevyear, '12'));
    // current year students
    $csjanuary = currentstds($conn, $year.'-01-01', month($year, '1'));
    $csfebruary = currentstds($conn, $year.'-02-01', month($year, '2'));
    $csmarch = currentstds($conn, $year.'-03-01', month($year, '3'));
    $csapril = currentstds($conn, $year.'-04-01', month($year, '4'));
    $csmay = currentstds($conn, $year.'-05-01', month($year, '5'));
    $csjune = currentstds($conn, $year.'-06-01', month($year, '6'));
    // current year teachers
    $ctjanuary = currentteach($conn, $year.'-01-01', month($year, '1'));
    $ctfebruary = currentteach($conn, $year.'-02-01', month($year, '2'));
    $ctmarch = currentteach($conn, $year.'-03-01', month($year, '3'));
    $ctapril = currentteach($conn, $year.'-04-01', month($year, '4'));
    $ctmay = currentteach($conn, $year.'-05-01', month($year, '5'));
    $ctjune = currentteach($conn, $year.'-06-01', month($year, '6'));
    // total month users
    $july = $psjuly['total'] + $ptjuly['total'];
    $august = $psaugust['total'] + $ptaugust['total'];
    $september = $psseptember['total'] + $ptseptember['total'];
    $october = $psoctober['total'] + $ptoctober['total'];
    $november = $psnovember['total'] + $ptnovember['total'];
    $december = $psdecember['total'] + $ptdecember['total'];
    $january = $csjanuary['total'] + $ctjanuary['total'];
    $february = $csfebruary['total'] + $ctfebruary['total'];
    $march = $csmarch['total'] + $ctmarch['total'];
    $april = $csapril['total'] + $ctapril['total'];
    $may = $csmay['total'] + $ctmay['total'];
    $june = $csjune['total'] + $ctjune['total'];
    // total students count
    // $stotal = array_sum($psjuly) + array_sum($psaugust) + array_sum($psseptember) + array_sum($psoctober) + array_sum($psnovember) + array_sum($psdecember) + array_sum($csjanuary) + array_sum($csfebruary) + array_sum($csmarch) + array_sum($csapril) + array_sum($csmay) + array_sum($csjune);
    $stotal = $psjuly['total'] + $psaugust['total'] + $psseptember['total'] + $psoctober['total'] + $psnovember['total'] + $psdecember['total'] + $csjanuary['total'] + $csfebruary['total'] + $csmarch['total'] + $csapril['total'] + $csmay['total'] + $csjune['total'];
    // $stotal = $psjuly['total'] + $psaugust['total'];
    // total teachers count
    $ttotal = $ptjuly['total'] + $ptaugust['total'] + $ptseptember['total'] + $ptoctober['total'] + $ptnovember['total'] + $ptdecember['total'] + $ctjanuary['total'] + $ctfebruary['total'] + $ctmarch['total'] + $ctapril['total'] + $ctmay['total'] + $ctjune['total'];
    // total users count(students + teachers)
    $total = $stotal + $ttotal;
    // working days
    // $w1 = wdays($prevyear, '7');
    // $w2 = wdays($prevyear, '8');
    // $w3 = wdays($prevyear, '9');
    // $w4 = wdays($prevyear, '10');
    // $w5 = wdays($prevyear, '11');
    // $w6 = wdays($prevyear, '12');
    // $w7 = wdays($year, '1');
    // $w8 = wdays($year, '2');
    // $w9 = wdays($year, '3');
    // $w10 = wdays($year, '4');
    // $w11 = wdays($year, '5');
    // $w12 = wdays($year, '6');
    $mysqlconn = new mysqli('localhost', 'root', '', 'dashboard');
    function workingdays($mysqlconn, $q){
        $result = $mysqlconn->query("SELECT details AS wrk FROM dashboard WHERE id = $q");
        $row = $result->fetch_assoc();
        return $row['wrk'];
    }
    
    $w1 = workingdays($mysqlconn, '15');
    $w2 = workingdays($mysqlconn, '16');
    $w3 = workingdays($mysqlconn, '17');
    $w4 = workingdays($mysqlconn, '18');
    $w5 = workingdays($mysqlconn, '19');
    $w6 = workingdays($mysqlconn, '20');
    $w7 = workingdays($mysqlconn, '21');
    $w8 = workingdays($mysqlconn, '22');
    $w9 = workingdays($mysqlconn, '23');
    $w10 = workingdays($mysqlconn, '24');
    $w11 = workingdays($mysqlconn, '25');
    $w12 = workingdays($mysqlconn, '26');


    $wdays = $w1 + $w2 + $w3 + $w4 + $w5 + $w6 + $w7 + $w8 + $w9 + $w10 + $w11 + $w12;

    $saverage = round($stotal / $wdays, 2);
    $taverage = round($ttotal / $wdays, 2);
    $average = round($total / $wdays, 2);
    $students = '1357';
    $teachers = '51';
    $mtotal = $students + $teachers;
    $percentage = round($average / $mtotal * 100, 3);

    return array(
        'psjuly' => $psjuly['total'], 
        'psaugust' => $psaugust['total'], 
        'psseptember' => $psseptember['total'], 
        'psoctober' => $psoctober['total'], 
        'psnovember' => $psnovember['total'], 
        'psdecember' => $psdecember['total'], 
        'ptjuly' => $ptjuly['total'], 
        'ptaugust' => $ptaugust['total'], 
        'ptseptember' => $ptseptember['total'], 
        'ptoctober' => $ptoctober['total'], 
        'ptnovember' => $ptnovember['total'], 
        'ptdecember' => $ptdecember['total'], 
        'csjanuary' => $csjanuary['total'], 
        'csfebruary' => $csfebruary['total'], 
        'csmarch' => $csmarch['total'], 
        'csapril' => $csapril['total'], 
        'csmay' => $csmay['total'], 
        'csjune' => $csjune['total'], 
        'ctjanuary' => $ctjanuary['total'], 
        'ctfebruary' => $ctfebruary['total'], 
        'ctmarch' => $ctmarch['total'], 
        'ctapril' => $ctapril['total'], 
        'ctmay' => $ctmay['total'], 
        'ctjune' => $ctjune['total'], 
        'stotal' => $stotal, 
        'ttotal' => $ttotal, 
        'total' => $total, 
        'july' => $july,
        'august' => $august,
        'september' => $september,
        'october' => $october,
        'november' => $november,
        'december' => $december,
        'january' => $january,
        'february' => $february,
        'march' => $march,
        'april' => $april,
        'may' => $may,
        'june' => $june,
        'w1' => $w1,
        'w2' => $w2,
        'w3' => $w3,
        'w4' => $w4,
        'w5' => $w5,
        'w6' => $w6,
        'w7' => $w7,
        'w8' => $w8,
        'w9' => $w9,
        'w10' => $w10,
        'w11' => $w11,
        'w12' => $w12,
        'wdays' => $wdays,
        'saverage' => $saverage,
        'taverage' => $taverage,
        'average' => $average,
        'students' => $students,
        'teachers' => $teachers,
        'mtotal' => $mtotal,
        'percentage' => $percentage
    );

}

// $response['data'] = $data;
echo json_encode(calculation($conn));
sqlsrv_close($conn);
?>