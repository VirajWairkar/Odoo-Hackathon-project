const router = require('express').Router();
const Expense = require('../models/Expense');

// Create expense
router.post('/', async (req, res) => {
  const { title, amount, userId } = req.body;

  let approvals = [
    { role: "Manager", status: "Pending" }
  ];

  // Bonus logic (multi-level)
  if (amount > 1000) {
    approvals = [
      { role: "Manager", status: "Pending" },
      { role: "Admin", status: "Pending" }
    ];
  }

  const expense = await Expense.create({
    title,
    amount,
    createdBy: userId,
    approvals
  });

  res.json(expense);
});

// Get all expenses
router.get('/all', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Approve expense
router.post('/approve', async (req, res) => {
  const { expenseId } = req.body;

  const expense = await Expense.findById(expenseId);

  if (!expense) return res.status(404).json({ msg: "Not found" });

  const pending = expense.approvals.find(a => a.status === "Pending");

  if (pending) {
    pending.status = "Approved";
  }

  if (expense.approvals.every(a => a.status === "Approved")) {
    expense.status = "Approved";
  }

  await expense.save();

  res.json(expense);
});

module.exports = router;