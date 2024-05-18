import React from "react";

export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  setExpenses,
  expenses,
  rowId,
  setExpense,
  setEditingRowID,
}) {
  if (!menuPosition.left) return;
  return (
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
          const {title, category, amount} = expenses.find((expenseEl) => expenseEl.id === rowId);
          setEditingRowID(rowId)
          setExpense({title, category, amount});
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id !== rowId)
          );
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}
