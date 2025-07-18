<?php

session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// 1) Auth check
if (empty($_SESSION['user_id'])) {
  http_response_code(401);
  echo json_encode(['error'=>'Not authenticated']);
  exit;
}

// 2) DB
require_once __DIR__ . '/config.php';

$stmt = $pdo->prepare("
  SELECT id, username, created_at
    FROM users
   WHERE id = ?
");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (! $user) {
  http_response_code(404);
  echo json_encode(['error'=>'User not found']);
  exit;
}

echo json_encode($user);