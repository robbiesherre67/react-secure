<?php
session_start();
session_destroy();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
echo json_encode(['message' => 'Logged out']);
