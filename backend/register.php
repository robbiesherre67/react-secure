<?php

// DEV: show all errors
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  header('Content-Type: application/json');
  echo json_encode(['error'=>'Method Not Allowed']);
  exit;
}

header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

// read JSON
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['error'=>'Invalid JSON payload']);
  exit;
}

$username = trim($data['username'] ?? '');
$password =        $data['password'] ?? '';
if ($username === '' || $password === '') {
  http_response_code(400);
  echo json_encode(['error'=>'Username & password required']);
  exit;
}
if (strlen($password) < 8) {
  http_response_code(400);
  echo json_encode(['error'=>'Password must be at least 8 characters']);
  exit;
}

// **DETECT whether the users table has a password_hash column**
try {
  $colCheck = $pdo->query(
    "SHOW COLUMNS FROM `users` LIKE 'password_hash'"
  );
  $hasHashColumn = (bool) $colCheck->fetch();
} catch (PDOException $e) {
  // If this metadata query fails, assume no hash column
  $hasHashColumn = false;
}

// Choose which column to insert into:
$pwCol = $hasHashColumn ? 'password_hash' : 'password';
$hash  = password_hash($password, PASSWORD_DEFAULT);

try {
  // Build SQL dynamically
  $sql  = "INSERT INTO users (username, `$pwCol`) VALUES (?, ?)";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$username, $hash]);

  http_response_code(201);
  echo json_encode(['success'=>true]);
} catch (PDOException $e) {
  if ($e->getCode()==='23000') {
    http_response_code(400);
    echo json_encode(['error'=>'Username already taken']);
  } else {
    http_response_code(500);
    echo json_encode([
      'error'=>'Server error during registration',
      'message'=>$e->getMessage()
    ]);
  }
}
