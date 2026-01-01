<?php
require_once __DIR__ . "/helpers.php";

$data = json_body();
$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

if ($name === "" || $email === "" || strlen($password) < 6) {
  http_response_code(400);
  echo json_encode(["error" => "Name, email, and password (min 6) required"]);
  exit;
}

$hash = password_hash($password, PASSWORD_BCRYPT);

try {
  $stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
  $stmt->execute([$name, $email, $hash]);
  echo json_encode(["ok" => true]);
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(["error" => "Email already used"]);
}
