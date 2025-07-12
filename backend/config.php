<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host    = '127.0.0.1';
$db      = 'reactsecure';
$user    = 'reactuser';           // changed from 'root'
$pass    = 'StrongPass123!';      // your new password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
  // this will now show the actual PDO error
  http_response_code(500);
  echo json_encode([
    'error'   => 'Database connection failed',
    'message' => $e->getMessage()
  ]);
  exit;
}
