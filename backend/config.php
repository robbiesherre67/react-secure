<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Use Docker environment variables, falling back to defaults if they’re missing
$host    = getenv('DB_HOST') ?: '127.0.0.1';
$db      = getenv('DB_NAME') ?: 'reactsecure';
$user    = getenv('DB_USER') ?: 'reactuser';
$pass    = getenv('DB_PASS') ?: 'StrongPass123!';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
  http_response_code(500);
  echo json_encode([
    'error'   => 'Database connection failed',
    'message' => $e->getMessage()
  ]);
  exit;
}
