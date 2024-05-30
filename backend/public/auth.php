<?php
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use Firebase\JWT\JWT;

$envFilePath = __DIR__ . '/../.env';
if (file_exists($envFilePath)) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
}

$apiKey = getenv('OPENAI_API_KEY');
$jwtSecret = getenv('JWT_SECRET');

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data['action'])) {
    $action = $data['action'];

    if ($action == 'register') {
        // Register user logic (save user to database)
        $username = $data['username'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT);
        // Save $username and $password to the database
        echo json_encode(['message' => 'User registered successfully']);
    } elseif ($action == 'login') {
        // Login user logic (validate user from database)
        $username = $data['username'];
        $password = $data['password'];
        // Fetch user from database and validate password
        // Assuming $user is fetched from the database
        if (password_verify($password, $user['password'])) {
            $payload = [
                'username' => $username,
                'exp' => time() + 3600 // Token expires in 1 hour
            ];
            $token = JWT::encode($payload, $jwtSecret, 'HS256');
            echo json_encode(['token' => $token]);
        } else {
            echo json_encode(['error' => 'Invalid username or password']);
        }
    }
}
