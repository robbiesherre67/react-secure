<?php
session_start();
require 'config.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
if (empty($_SESSION['user_id'])) { http_response_code(401); echo json_encode(['error'=>'Not auth']); exit; }

if ($_SERVER['REQUEST_METHOD']==='GET') {
  $stmt=$pdo->prepare("SELECT settings FROM users WHERE id=?");
  $stmt->execute([$_SESSION['user_id']]);
  echo json_encode($stmt->fetchColumn() ?: (object)[]);
  exit;
}

if ($_SERVER['REQUEST_METHOD']==='POST') {
  header("Access-Control-Allow-Methods: POST, OPTIONS");
  $input=json_decode(file_get_contents('php://input'), true) ?: [];
  $stmt=$pdo->prepare("UPDATE users SET settings = ? WHERE id = ?");
  $stmt->execute([json_encode($input), $_SESSION['user_id']]);
  echo json_encode(['message'=>'Settings saved']);
}
