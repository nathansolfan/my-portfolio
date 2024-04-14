<?php
require_once "../config/database.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Adjust this if your front end is served from another port or domain
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");  // If credentials like cookies or authorization headers are needed

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Stop script execution for OPTIONS requests
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //JSON as string
    $json_str = file_get_contents('php://input');
    $data = json_decode($json_str);
    $date = $data->date; //Assuming JSON sends date in a field named date

    try {
        $query = "INSERT INTO calendar (date_field) VALUES (?)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$date]);
        echo json_encode(['message' => 'Date saved successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Mehod not allowed']);
};
