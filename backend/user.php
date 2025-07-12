<?php
session_start();
require 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// If you’re using JWT instead of sessions, decode/verify token here.

if (empty($_SESSION['user_id'])) {
  http_response_code(401);
  echo json_encode(['error' => 'Not authenticated']);
  exit;
}

$stmt = $pdo->prepare("SELECT id, username, created_at FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();

if (!$user) {
  http_response_code(404);
  echo json_encode(['error' => 'User not found']);
  exit;
}

echo json_encode($user);
