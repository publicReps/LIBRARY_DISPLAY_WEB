<?php
// header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'dashboard');
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['newid']) && isset($_POST['newData'])) {
        $id = $_POST['newid'];
        $data = $_POST['newData'];
        if (!empty($id) && is_numeric($id)) {
            $conn->query("UPDATE dashboard SET details = '$data' WHERE id = $id");
        }
        echo "successfull";
    } elseif (isset($_POST['notice'])) {
        $data = $_POST['notice'];
        $conn->query("UPDATE dashboard SET details = '$data' WHERE id = 5");
        echo "Successfull";
    } else {
        echo "data not provided";
    }
} else {
    echo "invalid request";
}
$conn->close();
?>
