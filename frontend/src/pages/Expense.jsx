import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Switch,
  Box
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 THEME (MAIN FIX)
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    },
    shape: {
      borderRadius: 12
    }
  });

  // 🎯 Fetch
  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expense/all");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ➕ Submit
  const submit = async () => {
    if (!title || !amount) return;

    await axios.post("http://localhost:5000/api/expense", {
      title,
      amount,
      userId: user?._id
    });

    setTitle("");
    setAmount("");
    fetchExpenses();
  };

  // ✅ Approve
  const approve = async (id) => {
    await axios.post("http://localhost:5000/api/expense/approve", {
      expenseId: id
    });

    fetchExpenses();
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // 🔍 Filter
  const filteredExpenses = expenses.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      {/* 🔥 FULL DARK/LIGHT BACKGROUND FIX */}
      <Box
        sx={{
          p: 3,
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          transition: "0.3s"
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h1 style={{ margin: 0 }}>🚀 Smart Reimbursement</h1>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            🌙
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <Button onClick={logout}>Logout</Button>
          </Box>
        </Box>

        <h3>
          Welcome {user?.name} ({user?.role})
        </h3>

        {/* STATS */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {["Total", "Approved", "Pending"].map((label, i) => {
            const value =
              i === 0
                ? expenses.length
                : i === 1
                ? expenses.filter((e) => e.status === "Approved").length
                : expenses.filter((e) => e.status === "Pending").length;

            return (
              <Card
                key={label}
                sx={{
                  p: 2,
                  boxShadow: 3,
                  minWidth: 120,
                  textAlign: "center"
                }}
              >
                <CardContent>
                  <h4>{label}</h4>
                  <p>{value}</p>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* SEARCH */}
        <TextField
          label="Search Expense"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* EMPLOYEE FORM */}
        {user?.role === "Employee" && (
          <Card sx={{ mb: 3 }}>
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

        {/* LIST */}
        <h3>📊 All Expenses</h3>

        {filteredExpenses.map((e, index) => (
          <Card
            key={e._id}
            sx={{
              mb: 2,
              p: 2,
              boxShadow: 2,
              animation: `fadeIn 0.4s ease forwards`,
              animationDelay: `${index * 0.05}s`
            }}
          >
            <CardContent>
              <h3>{e.title}</h3>
              <p>₹{e.amount}</p>

              {/* STATUS */}
              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: "10px",
                  background:
                    e.status === "Approved" ? "green" : "orange",
                  color: "white"
                }}
              >
                {e.status}
              </span>

              <br />
              <br />

              {/* APPROVE */}
              {user?.role === "Manager" && e.status === "Pending" && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => approve(e._id)}
                >
                  Approve
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {/* ANIMATION */}
        <style>
          {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
        </style>
      </Box>
    </ThemeProvider>
  );
}