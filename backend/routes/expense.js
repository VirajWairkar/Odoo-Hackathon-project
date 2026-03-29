const router = require('express').Router();
const Expense = require('../models/Expense');

// Create expense
router.post('/', async (req, res) => {
  const { title, amount, userId } = req.body;

  // simple workflow
  const approvals = [
    { role: "Manager", status: "Pending" }
  ];

  const expense = await Expense.create({
    title,
    amount,
    createdBy: userId,
    approvals
  });

  res.json(expense);
});

module.exports = router;