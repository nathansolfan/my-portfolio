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

$pdo = new PDO($dsn, $username, $password, $options);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Route the request
switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        handlePost($pdo);
        break;
    case 'GET':
        handleGet($pdo);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

// Handle POST requests
function handlePost($pdo)
{
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id'])) {
        updateBooking($pdo, $data);
    } else {
        createBooking($pdo, $data);
    }
}

function handleGet($pdo)
{
    if (!isset($_GET['id'])) {
        // Optionally fetch and show all bookings if no ID is provided
        $query = "SELECT * FROM calendar";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($results) {
            echo json_encode($results);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "No bookings found"]);
        }
        return;
    }

    // Existing code to handle specific ID
    $bookingId = $_GET['id'];
    $query = "SELECT * FROM calendar WHERE id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$bookingId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Booking not found"]);
    }
}


// Function to create a booking
function createBooking($pdo, $data)
{
    if (!isset($data['date'], $data['time'], $data['contactInfo'], $data['comment'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
        return;
    }
    $query = "INSERT INTO calendar (date_field, time_slot, name, email, phone, comments) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([
        $data['date'],
        $data['time'],
        $data['contactInfo']['name'],
        $data['contactInfo']['email'],
        $data['contactInfo']['phone'],
        $data['comment']
    ]);
    echo json_encode(['message' => 'Data saved successfully']);
}

// Check for GET request with an email parameter
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['email'])) {
    $email = $_GET['email'];
    $query = "SELECT * FROM calendar WHERE email = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$email]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Booking not found with provided email"]);
    }
    exit;  // Important to prevent further execution
}

// Function to update a booking
function updateBooking($pdo, $data)
{
    if (!isset($data['date'], $data['time'], $data['name'], $data['email'], $data['phone'], $data['comments'], $data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
        return;
    }
    $query = "UPDATE calendar SET date_field = ?, time_slot = ?, name = ?, email = ?, phone = ?, comments = ? WHERE id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([
        $data['date'],
        $data['time'],
        $data['name'],
        $data['email'],
        $data['phone'],
        $data['comments'],
        $data['id']
    ]);
    echo json_encode(['message' => 'Booking updated successfully']);
}




















// // POST METHOD
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $data = json_decode(file_get_contents('php://input'), true);
//     if (isset($data['date'], $data['time'], $data['contactInfo'], $data['comment'])) {

//         $query = "INSERT INTO calendar (date_field, time_slot, name, email, phone, comments) VALUES (?, ?, ?, ?, ?, ?)";
//         $stmt = $pdo->prepare($query);
//         $stmt->execute([
//             $data['date'],
//             $data['time'],
//             $data['contactInfo']['name'],
//             $data['contactInfo']['email'],
//             $data['contactInfo']['phone'],
//             $data['comments']
//         ]);
//         echo json_encode(["message" => "Data saved successfully"]);
//     } else {
//         http_response_code(400);
//         echo json_encode(['error' => 'Invalid input']);
//     }
// } else {
//     http_response_code(405);
//     echo json_encode(['error' => 'Methodnot allowed']);
// }

// // GET by ID
// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//     $bookingId = $_GET['id'];

//     $query = "SELECT * FROM calendar WHERE id = ?";
//     $stmt = $pdo->prepare($query);
//     $stmt->execute([$bookingId]);
//     $result = $stmt->fetch(PDO::FETCH_ASSOC);

//     if ($result) {
//         echo json_encode($result);
//     } else {
//         http_response_code(404);
//         echo json_encode(["error" => "Booking not found"]);
//     }
// } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // Handle POST request
//     // Your existing POST handling code here...
// } else {
//     http_response_code(405);
//     echo json_encode(['error' => 'Method not allowed']);
// }

// // UPDATE

// if ($_SERVER["REQUEST_METHOD"] === "POST") {
//     $data = json_decode(file_get_contents('php://input'), true);
//     if (isset($data['id'], $data['date'], $data['time'], $data['name'], $data['email'], $data['phone'], $data['comments'])) {
//         $query = "UPDATE calendar SET date_field = ?, time_slot = ?, name = ?, email = ?, phone = ?, comments = ? WHERE id = ?";
//         $stmt = $pdo->prepare($query);
//         $stmt->execute([
//             $data['date'],
//             $data['time'],
//             $data['name'],
//             $data['email'],
//             $data['phone'],
//             $data['comments'],
//             $data['id']
//         ]);
//         echo json_encode(['message' => 'Booking updated successfully']);
//     } else {
//         http_response_code(400);
//         echo json_encode(['error' => 'Invalid input']);
//     }
// } else {
//     http_response_code(405);
//     echo json_encode(['error' => 'Method not allowed']);
// }
