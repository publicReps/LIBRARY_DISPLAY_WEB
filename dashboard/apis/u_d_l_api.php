<?php
// header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'dashboard');
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['newid']) && isset($_POST['newData']) && isset($_POST['param'])) {
        $id = $_POST['newid'];
        $title = $_POST['newData'];
        $param = $_POST['param'];
        if ($param == 'card_1') {
            if (!empty($id) && is_numeric($id)) {
                $conn->query("UPDATE b_images SET title = '$title' WHERE id = $id");
            }
        } elseif ($param == 'card_2') {
            if (!empty($id) && is_numeric($id)) {
                $conn->query("UPDATE l_images SET title = '$title' WHERE id = $id");
            }
        }
        echo "successfull";
    } else {
        echo "data not provided";
    }
} else {
    echo "invalid request";
}
$conn->close();
?>
