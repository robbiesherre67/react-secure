<?php
require 'config.php';

// Decode JSON input
$input = json_decode(file_get_contents('php://input'), true);
$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';

// Basic validation
if (strlen($username) < 3 || strlen($password) < 8) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid username or password']);
    exit;
}

// Hash the password
$hash = password_hash($password, PASSWORD_BCRYPT);

try {
    // Insert new user
    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->execute([$username, $hash]);

    http_response_code(201);
    echo json_encode(['message' => 'User registered successfully']);
} catch (\PDOException $e) {
    if ($e->getCode() === '23000') {
        // Duplicate entry (username taken)
        http_response_code(409);
        echo json_encode(['error' => 'Username already exists']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Server error']);
    }
}
