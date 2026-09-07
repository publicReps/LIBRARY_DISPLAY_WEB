<?php
header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'dashboard');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if (isset($_GET['q'])) {
    $query = $_GET['q'];
    // $param = $_GET['p'] ?? '2';
    // $conn->set_charset("utf8mb4");
    function a($conn, $q){
        $result = $conn->query("SELECT details FROM dashboard WHERE id = $q");
        $row = $result->fetch_assoc();
        return $row['details'];
    }

    $a = a($conn, $query);
    echo "$a<input type='hidden' value='$query'>";
    // if ($param == '1') {
    //     $a = a($conn, $query);
    //     echo $a;
    // } else {
    //     $a = a($conn, $query);
    //     echo "$a<input type='hidden' value='$query'>";
    // }
}
$conn->close();

?>