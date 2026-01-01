<?php
require_once __DIR__ . "/helpers.php";

$data = json_body();
$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

$stmt = $pdo->prepare(
  "SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1"
);
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user["password_hash"])) {
  http_response_code(401);
  echo json_encode(["error" => "Wrong email or password"]);
  exit;
}

$token = make_token();
$token_hash = hash("sha256", $token);
$expires = (new DateTime("+7 days"))->format("Y-m-d H:i:s");

$stmt = $pdo->prepare(
  "INSERT INTO auth_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)"
);
$stmt->execute([$user["id"], $token_hash, $expires]);

echo json_encode([
  "token" => $token,
  "user" => [
    "id" => $user["id"],
    "name" => $user["name"],
    "email" => $user["email"]
  ],
  "expires_at" => $expires
]);
