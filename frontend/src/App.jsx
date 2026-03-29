import Login from "./pages/Login";
import Expense from "./pages/Expense";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Login />;
  }

  // Role-based UI
  if (user.role === "Employee") {
    return <Expense />;
  }

  if (user.role === "Manager") {
    return <Expense />;
  }

  if (user.role === "Admin") {
    return <Expense />;
  }

  return <Login />;
}

export default App;