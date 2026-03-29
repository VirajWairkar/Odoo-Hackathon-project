import { useEffect, useState } from "react";
import axios from "axios";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // 🔹 Fetch all expenses
  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expense/all");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 🔹 Submit new expense
  const submit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.post("http://localhost:5000/api/expense", {
      title,
      amount,
      userId: user._id
    });

    alert("Expense submitted ✅");
    setTitle("");
    setAmount("");
    fetchExpenses();
  };

  // 🔹 Approve expense
  const approve = async (id) => {
    await axios.post("http://localhost:5000/api/expense/approve", {
      expenseId: id
    });

    alert("Approved ✅");
    fetchExpenses();
  };

  return (
    <div>
      <h2>Submit Expense</h2>

      {/* 🔹 Form */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={submit}>Submit</button>

      <hr />

      {/* 🔹 List */}
      <h2>All Expenses</h2>

      {expenses.map((e) => (
        <div key={e._id}>
          <p>
            {e.title} - ₹{e.amount} - {e.status}
          </p>

          {/* Show approve button only if pending */}
          {e.status === "Pending" && (
            <button onClick={() => approve(e._id)}>
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}