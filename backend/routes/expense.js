const router = require('express').Router();
const Expense = require('../models/Expense');

// Create expense
router.post('/', async (req, res) => {
  const { title, amount, userId } = req.body;

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

// Get all expenses ✅
router.get('/all', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Approve expense
router.post('/approve', async (req, res) => {
  const { expenseId } = req.body;

  const expense = await Expense.findById(expenseId);

  expense.approvals[0].status = "Approved";
  expense.status = "Approved";

  await expense.save();

  res.json(expense);
});

module.exports = router;