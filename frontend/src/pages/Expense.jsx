<h2 style={{ color: "#667eea" }}>
  🚀 Smart Reimbursement System
</h2>

import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent } from "@mui/material";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expense/all");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const submit = async () => {
    await axios.post("http://localhost:5000/api/expense", {
      title,
      amount,
      userId: user._id
    });

    setTitle("");
    setAmount("");
    fetchExpenses();
  };

  const approve = async (id) => {
    await axios.post("http://localhost:5000/api/expense/approve", {
      expenseId: id
    });

    fetchExpenses();
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    
    <div style={{ padding: "20px", background: "#f4f6f8", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>💼 Smart Reimbursement</h1>
        <Button variant="outlined" onClick={logout}>Logout</Button>
      </div>

      <h3>Welcome {user.name} ({user.role})</h3>

      {/* EMPLOYEE FORM */}
      {user.role === "Employee" && (
        <Card style={{ marginBottom: "20px", borderRadius: "12px" }}>
          <CardContent>
            <h3>➕ Submit Expense</h3>

            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Amount"
              fullWidth
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Button variant="contained" onClick={submit}>
              Submit
            </Button>
          </CardContent>
        </Card>
      )}

      {/* EXPENSE LIST */}
      <h3>📊 All Expenses</h3>

      {expenses.map((e) => (
        <Card key={e._id} style={{ marginBottom: "10px", borderRadius: "12px" }}>
          <CardContent>
            <h3>{e.title}</h3>
            <p>Amount: ₹{e.amount}</p>

            <p style={{
              fontWeight: "bold",
              color: e.status === "Approved" ? "green" : "orange"
            }}>
              {e.status}
            </p>

            {user.role === "Manager" && e.status === "Pending" && (
              <Button variant="contained" color="success" onClick={() => approve(e._id)}>
                Approve
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}