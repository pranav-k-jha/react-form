import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";

import "./App.css";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./expenseData";

export default function App() {
  const [expenses, setExpenses] = useState(expenseData);
  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm setExpenses={setExpenses}/>
        <ExpenseTable expenses={expenses}/>
        <div className="context-menu">
          <div>Edit</div>
          <div>Delete</div>
        </div>
      </div>
    </main>
  );
}
