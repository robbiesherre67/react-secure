<?php
session_start();
require 'config.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD']==='OPTIONS') exit;
if (empty($_SESSION['user_id'])) {
  http_response_code(401);
  echo json_encode(['error'=>'Not authenticated']); exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$username = trim($input['username'] ?? '');
if (strlen($username) < 3) {
  http_response_code(400);
  echo json_encode(['error'=>'Username too short']); exit;
}

try {
  $stmt = $pdo->prepare("UPDATE users SET username = ? WHERE id = ?");
  $stmt->execute([$username, $_SESSION['user_id']]);
  echo json_encode(['message'=>'Profile updated']);
} catch (\PDOException $e) {
  http_response_code(500);
  echo json_encode(['error'=>'Update failed']);
}
