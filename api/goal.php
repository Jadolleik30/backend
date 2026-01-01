<?php
require_once __DIR__ . "/helpers.php";
$user = require_user($pdo);

$method = $_SERVER["REQUEST_METHOD"];
$date = $_GET["date"] ?? date("Y-m-d");

if ($method === "GET") {
  $stmt = $pdo->prepare("SELECT daily_goal FROM goals WHERE user_id=? AND goal_date=? LIMIT 1");
  $stmt->execute([$user["id"], $date]);
  $row = $stmt->fetch();
  echo json_encode(["daily_goal" => $row ? (int)$row["daily_goal"] : 2000]);
  exit;
}

if ($method === "POST") {
  $data = json_body();
  $goal = (int)($data["daily_goal"] ?? 2000);
  if ($goal < 0) $goal = 0;

  $stmt = $pdo->prepare("
    INSERT INTO goals (user_id, goal_date, daily_goal)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE daily_goal = VALUES(daily_goal)
  ");
  $stmt->execute([$user["id"], $date, $goal]);

  echo json_encode(["ok" => true]);
  exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
