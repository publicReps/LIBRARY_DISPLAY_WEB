<?php
$conn = new mysqli('localhost', 'root', '', 'dashboard');

// Check database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle file uploads
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['c']) && isset($_POST['id']) && isset($_POST['title']) && isset($_FILES['photo'])) {
    // $c = intval($_POST['c']);
    $c = $_POST['c'];
    // $id = intval($_POST['id']); // Sanitize input
    $title = htmlspecialchars($_POST['title'], ENT_QUOTES, 'UTF-8'); // Sanitize input
    $uploads_dir = '../images';

    // Ensure the uploads directory exists
    if (!is_dir($uploads_dir)) {
        mkdir($uploads_dir, 0777, true);
    }

    // Check if the upload is successful
    if ($_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $tmp_name = $_FILES['photo']['tmp_name'];
        $name = uniqid() . '_' . basename($_FILES['photo']['name']); // Generate a unique filename
        $target_path = $uploads_dir . '/' . $name;
        $target_path_s = 'images/' . $name;

        // Move the uploaded file to the uploads directory
        if (move_uploaded_file($tmp_name, $target_path)) {
            // Store the photo information in the database
            if ($c === '1') {
                $stmt = $conn->prepare("INSERT INTO b_images (title, src) VALUES (?, ?)");
                $stmt->bind_param("ss", $title, $target_path_s);
            } elseif ($c === '2') {
                $stmt = $conn->prepare("INSERT INTO l_images (title, src) VALUES (?, ?)");
                $stmt->bind_param("ss", $title, $target_path_s);
            } else {
                exit();
            }

            if ($stmt->execute()) {
                // echo "Upload successful.";
                echo "<p class='glassmorphism-notify'>Upload successfully.</p>";
            } else {
                // echo "Upload failed.";
                echo "<p class='glassmorphism-notify'>Upload failed.</p>";
            }
            $stmt->close();
        }
    }
    $conn->close();
    exit;
}

// If no valid request is made
echo "Invalid request.";
$conn->close();
?>