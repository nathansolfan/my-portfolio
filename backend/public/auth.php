<?php

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


$envFilePath = __DIR__ . '/../.env';
if (file_exists($envFilePath)) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
}

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

try {
    $pdo = new PDO('sqlite:' . __DIR__ . '/../database.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data['action'])) {
        $action = $data['action'];
        $username = $data['username'];
        $password = $data['password'];

        if ($action == 'register') {
            $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
            $passwordHash = password_hash($password, PASSWORD_BCRYPT);
            $stmt->execute([$username, $passwordHash]);
            echo json_encode(['message' => 'User registered successfully']);
        } elseif ($action == 'login') {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
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
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    error_log($e->getMessage());
}
