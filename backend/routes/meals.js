const express = require("express");
const db = require("../db");
const auth = require("./authMiddleware");

const router = express.Router();

// GET meals for a date
router.get("/", auth, async (req, res) => {
  const date = req.query.date;

  const [rows] = await db.query(
    "SELECT * FROM meals WHERE user_id = ? AND meal_date = ? ORDER BY created_at",
    [req.userId, date]
  );

  res.json(rows);
});

// ADD meal
router.post("/", auth, async (req, res) => {
  const { name, calories, type, meal_date } = req.body;

  await db.query(
    "INSERT INTO meals (user_id, name, calories, type, meal_date) VALUES (?, ?, ?, ?, ?)",
    [req.userId, name, calories, type, meal_date]
  );

  res.json({ ok: true });
});

// DELETE meal
router.delete("/:id", auth, async (req, res) => {
  await db.query(
    "DELETE FROM meals WHERE id = ? AND user_id = ?",
    [req.params.id, req.userId]
  );

  res.json({ ok: true });
});

module.exports = router;
