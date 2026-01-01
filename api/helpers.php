<?php
require_once __DIR__ . "/db.php";

function json_body() {
  $raw = file_get_contents("php://input");
  return $raw ? json_decode($raw, true) : [];
}

function make_token() {
  return bin2hex(random_bytes(32));
}

function get_bearer_token() {
  $headers = getallheaders();
  if (!isset($headers["Authorization"])) return null;
  $auth = $headers["Authorization"];
  if (strpos($auth, "Bearer ") !== 0) return null;
  return substr($auth, 7);
}

function require_user($pdo) {
  $token = get_bearer_token();
  if (!$token) {
    http_response_code(401);
    echo json_encode(["error" => "Missing token"]);
    exit;
  }

  $token_hash = hash("sha256", $token);

  $stmt = $pdo->prepare("
    SELECT u.id, u.name, u.email
    FROM auth_tokens t
    JOIN users u ON u.id = t.user_id
    WHERE t.token_hash = ? AND t.expires_at > NOW()
    LIMIT 1
  ");
  $stmt->execute([$token_hash]);
  $user = $stmt->fetch();

  if (!$user) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid/expired token"]);
    exit;
  }
  return $user;
}
