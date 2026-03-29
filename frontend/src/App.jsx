import Login from "./pages/Login";
import Expense from "./pages/Expense";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Login />;
  }

  return <Expense />;
}

export default App;