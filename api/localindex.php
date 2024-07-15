    <?php
    require_once "../config/database.php";

    // Ensure no PHP errors are sent to the client
    ini_set('display_errors', 0);  // Turn off display of errors
    error_reporting(E_ALL);        // Still log them for the server logs

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
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
        case 'DELETE':
            handleDelete($pdo);
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
        error_log(print_r($data, true)); // This will log the data to your PHP error log

        if (isset($data['id'])) {
            updateBooking($pdo, $data);
        } else {
            createBooking($pdo, $data);
        }
    }
    // GET REQUEST
    function handleGet($pdo)
    {
        // Fetching bookings by email if 'email' parameter is set
        if (isset($_GET['email'])) {
            $email = $_GET['email'];
            $query = "SELECT * FROM calendar WHERE email = ?";
            $stmt = $pdo->prepare($query);
            $stmt->execute([$email]);
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($results) {
                echo json_encode($results);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "No bookings found for the specified email"]);
            }
        } else {
            // Fetching all bookings if no specific parameter is provided
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

    // Function to update a booking
    function updateBooking($pdo, $data)
    {
        if (!isset($data['date_field'], $data['time_slot'], $data['name'], $data['email'], $data['phone'], $data['comments'], $data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input', 'received' => $data]);
            return;
        }
        $query = "UPDATE calendar SET date_field = ?, time_slot = ?, name = ?, email = ?, phone = ?, comments = ? WHERE id = ?";
        $stmt = $pdo->prepare($query);
        $success = $stmt->execute([
            $data['date_field'],
            $data['time_slot'],
            $data['name'],
            $data['email'],
            $data['phone'],
            $data['comments'],
            $data['id']
        ]);

        if ($success) {
            echo json_encode(['message' => 'Booking updated successfully']);
        } else {
            echo json_encode(['error' => 'Update failed', 'details' => $stmt->errorInfo()]);
        }
    }

    function handleDelete($pdo)
    {
        parse_str(file_get_contents("php://input"), $DELETE);

        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing ID for deletion']);
            return;
        }

        $id = $_GET['id'];
        $query = "DELETE FROM calendar WHERE id = ?";
        $stmt = $pdo->prepare($query);
        $success = $stmt->execute([$id]);

        if ($success) {
            echo json_encode(['message' => 'Booking deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete booking', 'details' => $stmt->errorInfo()]);
        }
    }
