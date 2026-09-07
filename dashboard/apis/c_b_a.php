<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['param']) && isset($_GET['sub_param'])) {
        $param = $_GET['param'];
        $sub_param = $_GET['sub_param'];
        // echo $param . $sub_param;
        if ($param === '1') {
            // echo 'test';
            if ($sub_param === '1') {
                echo '101';
            } elseif ($sub_param === '2') {
                echo '90';
            } elseif ($sub_param === '3') {
                echo '70';
            }
        } elseif ($param === '2') {
            if ($sub_param === '1') {
                echo '15000';
            } elseif ($sub_param === '2') {
                echo '25000';
            }
        } elseif ($param === '3') {
            if ($sub_param === '1') {
                echo '40';
            } elseif ($sub_param === '2') {
                echo '10';
            } elseif ($sub_param === '3') {
                echo '20';
            } elseif ($sub_param === '4') {
                echo '30';
            }
        }
    }
}
?>