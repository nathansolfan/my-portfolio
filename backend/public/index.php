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
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['date'], $data['time'], $data['contactInfo'], $data['comment'])) {

        $query = "INSERT INTO calendar (date_field, time_slot, name, email, phone, comments) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            $data['date'],
            $data['time'],
            $data['contactInfo']['name'],
            $data['contactInfo']['email'],
            $data['contactInfo']['phone'],
            $data['comments']
        ]);
        echo json_encode(["message" => "Data saved successfully"]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Methodnot allowed']);
}
