import { useState } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("user", JSON.stringify(res.data));
    window.location.reload();
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #667eea, #764ba2)"
    }}>
      <Card style={{ width: "350px", padding: "20px", borderRadius: "15px" }}>
        <CardContent>
          <h2 style={{ textAlign: "center" }}>🚀 Smart Reimbursement</h2>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: "15px", backgroundColor: "#667eea" }}
            onClick={login}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}