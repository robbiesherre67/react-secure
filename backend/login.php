<?php
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

try {
  $stmt = $pdo->prepare(
    "SELECT id, password_hash FROM users WHERE username = ?"
  );
  $stmt->execute([$username]);
  $user = $stmt->fetch();
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    'error'   => 'DB query failed',
    'message' => $e->getMessage()
  ]);
  exit;
}

if (! $user || ! password_verify($password, $user['password_hash'])) {
  http_response_code(401);
  echo json_encode(['error'=>'Invalid credentials']);
  exit;
}

// success!
session_regenerate_id(true);
$_SESSION['user_id'] = $user['id'];

echo json_encode(['success'=>true]);
