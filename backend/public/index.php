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

$config = include(__DIR__ . '/config.php');

$apiKey = $config['api_key'];
$jwtSecret = getenv('JWT_SECRET');
if (!$apiKey || !$jwtSecret) {
    echo json_encode(['error' => 'API key or JWT secret not found in environment']);
    exit;
}

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}

$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $jwt = $matches[1];
    try {
        $decoded = JWT::decode($jwt, new Key($jwtSecret, 'HS256'));
    } catch (Exception $e) {
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
} else {
    echo json_encode(['error' => 'Authorization header not found']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['prompt'])) {
    echo json_encode(['error' => 'No prompt provided']);
    exit;
}

$url = $config['api_url'];
$model = $config['model'];
$eli5Prompt = "Explain like I'm five: " . $data['prompt'];

$messages = [
    ['role' => 'user', 'content' => $eli5Prompt]
];

$payload = json_encode([
    'model' => $model,
    'messages' => $messages,
    'max_tokens' => 150
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
]);
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

$response = curl_exec($ch);
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    error_log('Curl error: ' . curl_error($ch));
    echo json_encode(['error' => 'Curl error: ' . curl_error($ch)]);
} else {
    $decoded = json_decode($response, true);
    if (!empty($decoded['choices']) && isset($decoded['choices'][0]['message']['content'])) {
        echo json_encode(['story' => $decoded['choices'][0]['message']['content']]);
    } else {
        error_log('Failed response: ' . json_encode($decoded));
        echo json_encode([
            'error' => 'Failed to fetch story',
            'response' => $decoded,
            'status' => $http_status
        ]);
    }
}

curl_close($ch);
