<?php
$servername = "localhost";
$username = "root";
$password = "pass4root";
$database = "homework4";
$conn = mysqli_connect($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  echo "Connected successfully";
?>
