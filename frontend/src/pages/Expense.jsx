import { useEffect, useState } from "react";
import axios from "axios";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch expenses
  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expense/all");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Submit expense
  const submit = async () => {
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

  // Approve expense
  const approve = async (id) => {
    await axios.post("http://localhost:5000/api/expense/approve", {
      expenseId: id
    });

    alert("Approved ✅");
    fetchExpenses();
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <h2>Welcome {user.name} ({user.role})</h2>

      <button onClick={logout}>Logout</button>

      <hr />

      {/* Employee only */}
      {user.role === "Employee" && (
        <>
          <h3>Submit Expense</h3>

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
        </>
      )}

      <h3>All Expenses</h3>

      {expenses.map((e) => (
        <div key={e._id}>
          <p>
            {e.title} - ₹{e.amount} - {e.status}
          </p>

          {/* Only Manager can approve */}
          {user.role === "Manager" && e.status === "Pending" && (
            <button onClick={() => approve(e._id)}>
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}