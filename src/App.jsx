import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./expenseData";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [expenses, setExpenses] = useState(expenseData);
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const [editingRowID, setEditingRowID] = useState('')

  const [localData, setLocalData] = useLocalStorage('myNum', [1, 2, 3])
  console.log(localData)

  return (
    <main>
      <h1 onClick={() => {
        setLocalData([4, 5, 6])
      }}>Track Your Expense</h1>
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
