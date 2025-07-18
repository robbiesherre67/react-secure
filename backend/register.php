<?php
// DEV: show all errors
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

// CORS headers for both preflight and actual requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 1) Handle OPTIONS preflight and bail out
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// 2) Must be POST from here on
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  header('Content-Type: application/json');
  echo json_encode(['error' => 'Method Not Allowed']);
  exit;
}

// 3) Always respond JSON
header('Content-Type: application/json');

// 4) Load your DB config
require_once __DIR__ . '/config.php';

// 5) Read & decode JSON payload
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid JSON payload']);
  exit;
}

// 6) Validate fields
$username = trim($data['username']  ?? '');
$password =        $data['password'] ?? '';

if ($username === '' || $password === '') {
  http_response_code(400);
  echo json_encode(['error' => 'Username & password required']);
  exit;
}

// 7) Enforce minimum password length
if (strlen($password) < 8) {
  http_response_code(400);
  echo json_encode(['error' => 'Password must be at least 8 characters']);
  exit;
}

// 8) Hash & insert
$hash = password_hash($password, PASSWORD_DEFAULT);

try {
  $stmt = $pdo->prepare(
    "INSERT INTO users (username, password_hash) VALUES (?, ?)"
  );
  $stmt->execute([$username, $hash]);

  http_response_code(201);
  echo json_encode(['success' => true]);
} catch (PDOException $e) {
  // duplicate username?
  if ($e->getCode() === '23000') {
    http_response_code(400);
    echo json_encode(['error' => 'Username already taken']);
  } else {
    http_response_code(500);
    echo json_encode([
      'error'   => 'Server error during registration',
      'message' => $e->getMessage()
    ]);
  }
}
