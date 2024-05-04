<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Adjust in production for security
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$apiKey = getenv('OPENAI_API_KEY'); // Ensure your API key is set in your environment variables

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($data['prompt'])) {
    $url = "https://api.openai.com/v1/engines/text-davinci-002/completions";

    $payload = json_encode([
        'prompt' => $data['prompt'],
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

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode(['error' => curl_error($ch)]);
    } else {
        $decoded = json_decode($response, true);
        if (isset($decoded['choices'][0]['text'])) {
            echo json_encode(['story' => $decoded['choices'][0]['text']]);
        } else {
            echo json_encode(['error' => 'Failed to fetch story']);
        }
    }

    curl_close($ch);
} else {
    echo json_encode(['error' => 'No prompt provided']);
}
