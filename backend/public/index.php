<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Return early for OPTIONS request, with necessary headers
    header("HTTP/1.1 204 No Content");
    exit;
}

// Regular POST request processing continues below
$apiKey = getenv('OPENAI_API_KEY'); // Ensure this is correctly set in the environment

$data = json_decode(file_get_contents('php://input'), true);
if (!empty($data['prompt'])) {
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
        echo json_encode(['story' => $decoded['choices'][0]['text'] ?? 'Failed to fetch story']);
    }

    curl_close($ch);
} else {
    echo json_encode(['error' => 'No prompt provided']);
}
?>
