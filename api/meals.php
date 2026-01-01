<?php
require_once __DIR__ . "/helpers.php";
$user = require_user($pdo);

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
  $date = $_GET["date"] ?? date("Y-m-d");
  $stmt = $pdo->prepare("SELECT id, name, calories, type, meal_date FROM meals WHERE user_id=? AND meal_date=? ORDER BY id DESC");
  $stmt->execute([$user["id"], $date]);
  echo json_encode(["meals" => $stmt->fetchAll()]);
  exit;
}

if ($method === "POST") {
  $data = json_body();
  $name = trim($data["name"] ?? "");
  $calories = (int)($data["calories"] ?? 0);
  $type = $data["type"] ?? "Breakfast";
  $meal_date = $data["meal_date"] ?? date("Y-m-d");

  if ($name === "" || $calories <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid meal"]);
    exit;
  }

  $stmt = $pdo->prepare("INSERT INTO meals (user_id, name, calories, type, meal_date) VALUES (?, ?, ?, ?, ?)");
  $stmt->execute([$user["id"], $name, $calories, $type, $meal_date]);

  echo json_encode(["ok" => true, "id" => (int)$pdo->lastInsertId()]);
  exit;
}

if ($method === "DELETE") {
  $id = (int)($_GET["id"] ?? 0);
  $stmt = $pdo->prepare("DELETE FROM meals WHERE id=? AND user_id=?");
  $stmt->execute([$id, $user["id"]]);
  echo json_encode(["ok" => true]);
  exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
