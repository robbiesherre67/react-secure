<?php
// backend/login.php

session_start();
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

// Detect which column to SELECT
try {
  $colCheck = $pdo->query(
    "SHOW COLUMNS FROM `users` LIKE 'password_hash'"
  );
  $hasHashColumn = (bool) $colCheck->fetch();
} catch (PDOException $e) {
  $hasHashColumn = false;
}
$pwCol = $hasHashColumn ? 'password_hash' : 'password';

try {
  $sql  = "SELECT id, `$pwCol` AS pw FROM users WHERE username = ?";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$username]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    'error'=>'DB query failed',
    'message'=>$e->getMessage()
  ]);
  exit;
}

if (! $user || ! password_verify($password, $user['pw'])) {
  http_response_code(401);
  echo json_encode(['error'=>'Invalid credentials']);
  exit;
}

session_regenerate_id(true);
$_SESSION['user_id'] = $user['id'];
echo json_encode(['success'=>true]);
