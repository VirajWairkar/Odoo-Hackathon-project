const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  status: { type: String, default: "Pending" },
  createdBy: String,
  approvals: [
    {
      role: String,
      status: { type: String, default: "Pending" }
    }
  ]
});

module.exports = mongoose.model('Expense', expenseSchema);