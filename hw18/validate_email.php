<?php

$servername = "localhost";
$username = "hw15";
$password = "Printer12";
$dbname = "hw15";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get email from request 
$email = $_GET['email'] ?? '';

if (!empty($email))
{
    // Prep SQL statement
    $statement = $conn->prepare("SELECT COUNT(*) FROM employees WHERE email = ?");
    $statement->bind_param("s", $email);
    $statement->execute();
    $statement->bind_result($count);
    $statement->fetch();
    $statement->close();

    // Encode and return result as JSON
    echo json_encode(['exists' => $count > 0]);
} else {
    echo json_encode(['error' => 'Invalid email']);
}

$conn->close();