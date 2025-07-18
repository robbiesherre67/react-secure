<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$ok = isset($_SESSION['user_id']);

if (! $ok) {
  http_response_code(401);
}

echo json_encode([
  'authenticated' => $ok
]);
