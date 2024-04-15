<?php
require_once "../config/database.php";

// Ensure no PHP errors are sent to the client
ini_set('display_errors', 0);  // Turn off display of errors
error_reporting(E_ALL);        // Still log them for the server logs

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_str = file_get_contents('php://input');
    $data = json_decode($json_str);
    $date = $data->date;

    try {
        $query = "INSERT INTO calendar (date_field) VALUES (?)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$date]);
        echo json_encode(['message' => 'Date saved successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
