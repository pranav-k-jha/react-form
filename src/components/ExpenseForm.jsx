import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  expense,
  setExpenses,
  setExpense,
  editingRowID,
  setEditingRowID,
}) {
  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 5, message: "Title should be at least 5 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      { pattern: /^[1-9]\d*(\.\d+)?$/, message: "Please enter a valid number" },
    ],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < 5) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(expense);

    if (Object.keys(validateResult).length) return;

    if (editingRowID) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowID) {
            return { ...expense, id: editingRowID };
          }
          return prevExpense;
        })
      );
      setEditingRowID("");
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOption="Select Category"
        error={errors.category}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      <button className="add-btn">{editingRowID ? "Save" : "Add"}</button>
    </form>
  );
}
