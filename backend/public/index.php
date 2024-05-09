<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    error_log("Received OPTIONS request");
    header("HTTP/1.1 204 No Content");
    exit;
}

error_log("Handling POST request");

$apiKey = getenv('OPENAI_API_KEY');
if (empty($apiKey)) {
    error_log("API key is not set");
    echo json_encode(['error' => 'API key is not configured properly']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data['prompt'])) {
    error_log("Prompt received: " . $data['prompt']);
    $url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
    $payload = json_encode([
        'prompt' => $data['prompt'],
        'max_tokens' => 150
    ]);

    error_log("Sending request to OpenAI API");
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        error_log("Curl error: " . curl_error($ch));
        echo json_encode(['error' => curl_error($ch)]);
    } else {
        $decoded = json_decode($response, true);
        if (isset($decoded['choices'][0]['text'])) {
            echo json_encode(['story' => $decoded['choices'][0]['text']]);
        } else {
            error_log("Failed to fetch story from response");
            echo json_encode(['error' => 'Failed to fetch story']);
        }
    }
    curl_close($ch);
} else {
    error_log("No prompt provided");
    echo json_encode(['error' => 'No prompt provided']);
}
