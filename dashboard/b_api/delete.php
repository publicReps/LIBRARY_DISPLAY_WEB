<?php
$conn = new mysqli('localhost', 'root', '', 'dashboard');
if ($conn->connect_error){
    die("Connection failed:" . $conn->connect_error);
}
$c = $_GET['c'];
$q = $_GET['q'];
if ($c === '1') {
    $conn->query("DELETE FROM b_images WHERE id = $q");
} elseif ($c === '2') {
    $conn->query("DELETE FROM l_images WHERE id = $q");
}
// $conn->query("DELETE FROM b_images WHERE id = $q");
$conn->close();
?>