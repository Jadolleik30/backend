const express = require("express");
const db = require("../db");
const auth = require("./authMiddleware");

const router = express.Router();

// GET daily goal
router.get("/", auth, async (req, res) => {
  const date = req.query.date;

  const [rows] = await db.query(
    "SELECT daily_goal FROM goals WHERE user_id = ? AND goal_date = ?",
    [req.userId, date]
  );

  res.json(rows[0] || { daily_goal: 2000 });
});

// SET daily goal
router.post("/", auth, async (req, res) => {
  const { goal_date, daily_goal } = req.body;

  await db.query(
    `INSERT INTO goals (user_id, goal_date, daily_goal)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE daily_goal = VALUES(daily_goal)`,
    [req.userId, goal_date, daily_goal]
  );

  res.json({ ok: true });
});

module.exports = router;
