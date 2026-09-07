<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dashboard";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, src, title FROM b_images";
$result = $conn->query($sql);

$images = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $row['src'] = 'dashboard/' . $row['src'];
        $images[] = $row;
    }
}

$conn->close();
echo json_encode($images);
?>