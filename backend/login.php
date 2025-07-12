<?php
session_start();
require 'config.php';

// Decode JSON input
$input = json_decode(file_get_contents('php://input'), true);
$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';

// Validate presence
if (!$username || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Username & password required']);
    exit;
}

// Fetch the user
$stmt = $pdo->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

// Verify credentials
if (!$user || !password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
}

// On success, set session and respond
$_SESSION['user_id'] = $user['id'];
echo json_encode(['message' => 'Login successful']);
