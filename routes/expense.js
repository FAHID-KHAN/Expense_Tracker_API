const express = require("express");
const Expense = require("../models/expense");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { userID, amount, category } = req.body;
  try {
    const expense = new Expense({ userID, amount, category });
    await expense.save();
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add expense", details: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId }).sort({
      date: -1,
    });
    res.json({ expenses });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch expenses ", details: err.message });
  }
});

module.exports = router;
