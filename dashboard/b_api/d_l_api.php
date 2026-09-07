<?php
$conn = new mysqli('localhost', 'root', '',  'dashboard');
// $c = intval($_GET['c']);
$c = $_GET['c'];
if ($c === '1') {
    $result = $conn->query("SELECT * FROM b_images");
} elseif ($c === '2') {
    $result = $conn->query("SELECT * FROM l_images");
} else {
    exit();
}
// $result = $conn->query("SELECT * FROM b_images");
if ($result->num_rows > 0){
    while ($row = $result->fetch_assoc()){
        // echo "<p>{$row['id']}</p>";
        echo "<li id='card-{$row['id']}' class='card-item swiper-slide'>";
        echo "<div class='card-link'>";
        echo "<img src='{$row['src']}' class='card-image'>";
        echo "<p class='badge badge-designer'>{$row['id']}</p>";
        // echo "<h2 class='card-title'>{$row['title']}</h2>";
        if ($c === '1') {
            echo "<div class='card-title card_1'>{$row['title']}<input type='hidden' value='{$row['id']}'></div>";
        } elseif ($c === '2') {
            echo "<div class='card-title card_2'>{$row['title']}<input type='hidden' value='{$row['id']}'></div>";
        }
        // echo "<div class='card-title card_1'>{$row['title']}<input type='hidden' value='{$row['id']}'></div>";
        echo "<button type='button' class='delete' style='width: 60px;height:35px;margin:30px 0 5px;' hx-delete='b_api/delete.php?q={$row['id']}&&c=$c' hx-trigger='click' hx-target='#card-{$row['id']}' hx-swap='outerHTML'>Delete</button>";
        echo "</div>";
        echo "</li>";
        // echo "<script src='js/t.js'></script>";
    }
} else {
    echo "<li id='card-demo' class='card-item swiper-slide'>";
    echo "<div class='card-link'>";
    echo "<img src='images/empty.jpg' class='card-image'>";
    echo "<p class='badge badge-designer'>demo_1</p>";
    echo "<h2 class='card-title'>No data available</h2>";
    echo "<button type='button' style='width: 60px;height:35px;margin:30px 0 5px;'>Delete</button>";
    echo "</div>";
    echo "</li>";
}
// echo "<script src='js/t.js'></script>";
$conn->close();
?>