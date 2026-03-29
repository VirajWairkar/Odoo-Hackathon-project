import { useState } from "react";
import axios from "axios";

export default function Expense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const submit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.post("http://localhost:5000/api/expense", {
      title,
      amount,
      userId: user._id
    });

    alert("Expense submitted ✅");
  };

  return (
    <div>
      <h2>Submit Expense</h2>

      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Amount" onChange={e => setAmount(e.target.value)} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}