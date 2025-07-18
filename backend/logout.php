<?php

session_start();
header("Content-Type: application/json");

// destroy session
$_SESSION = [];
if (ini_get("session.use_cookies")) {
  setcookie(session_name(), '', time() - 42000, '/');
}
session_destroy();

echo json_encode(['success'=>true]);
