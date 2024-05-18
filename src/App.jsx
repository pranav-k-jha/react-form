import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./expenseData";

function App() {
  const [expenses, setExpenses] = useState(expenseData);
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const [editingRowID, setEditingRowID] = useState('')

  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          expense={expense}
          setExpense={setExpense}
          editingRowID={editingRowID}
          setEditingRowID = {setEditingRowID}
        />
        <ExpenseTable expenses={expenses} setExpenses={setExpenses} setExpense={setExpense} setEditingRowID={setEditingRowID} />
      </div>
    </main>
  );
}

export default App;
