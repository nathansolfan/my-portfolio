<?php
$host = "localhost";
$dbname = "my-portfolio";
$username = "root";
$password = "A9p4b7m21990!";
$charset = "utf8";

// Errors are important: If something goes wrong (like the key doesn’t work), the program will loudly tell you what happened, instead of just whispering or saying nothing.
// Reading easily: When it finds a file, it will show you the contents with labels, not just a jumble of information.
// Direct talking: It talks directly to the cabinet without pretending to be something it’s not, which is safer and faster.
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
// CONNECT DATABSE
$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
