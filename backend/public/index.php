<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}
$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data['prompt'])) {
    $url = "https://api.openai.com/v1/chat/completions";
    $model = "gpt-3.5-turbo"; // Specify the model here
    $messages = [
        [
            'role' => 'user',
            'content' => $data['prompt']
        ]
    ];

    $payload = json_encode([
        'model' => $model, // Include model in the payload
        'messages' => $messages,
        'max_tokens' => 150
    ]);
    error_log('Using API Key: ' . $apiKey);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);

    $response = curl_exec($ch);
    $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        echo json_encode(['error' => 'Curl error: ' . curl_error($ch)]);
    } else {
        $decoded = json_decode($response, true);
        if (!empty($decoded['choices']) && isset($decoded['choices'][0]['message']['content'])) {
            echo json_encode(['story' => $decoded['choices'][0]['message']['content']]);
        } else {
            // Log the entire response to understand what's coming back
            echo json_encode([
                'error' => 'Failed to fetch story',
                'response' => $decoded,
                'status' => $http_status
            ]);
        }
    }

    curl_close($ch);
} else {
    echo json_encode(['error' => 'No prompt provided']);
}
