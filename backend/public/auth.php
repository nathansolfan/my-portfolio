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
if (!$jwtSecret) {
    echo json_encode(['error' => 'JWT secret not found in environment']);
    exit;
}

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
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
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)");

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data['action'])) {
        $action = $data['action'];
        $email = $data['email'];
        $password = $data['password'];

        if ($action == 'register') {
            $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
            $passwordHash = password_hash($password, PASSWORD_BCRYPT);
            $stmt->execute([$email, $passwordHash]);
            echo json_encode(['message' => 'User registered successfully']);
        } elseif ($action == 'login') {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                $payload = [
                    'email' => $email,
                    'exp' => time() + 3600 // Token expires in 1 hour
                ];
                $token = JWT::encode($payload, $jwtSecret, 'HS256');
                echo json_encode(['token' => $token]);
            } else {
                echo json_encode(['error' => 'Invalid email or password']);
            }
        }
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    error_log($e->getMessage());
}
