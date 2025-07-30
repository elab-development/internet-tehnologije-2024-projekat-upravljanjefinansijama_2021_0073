import React, { useState } from "react";
import ExpenseCard from "./ExpenseCard";
import EditExpenseForm from "./EditExpenseForm";
import axios from "axios";

const Expenses = ({ expenses: initialExpenses, budgetId, onUpdate }) => {
  const [expenses, setExpenses] = useState(initialExpenses || []);
  const [editingExpense, setEditingExpense] = useState(null); 
  

  const handleDeleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem("access_token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/budgets/${budgetId}/expenses/${expenseId}`, config);

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== expenseId)
      );

      console.log(`Expense with ID ${expenseId} successfully deleted.`);
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data || error.message);
    }
  };

  

  if (!expenses || expenses.length === 0) {
    return <p>No expenses found.</p>;
  }

  return (
    <div>
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          budgetId={budgetId}
          onDelete={handleDeleteExpense}
          onEdit={() => setEditingExpense(expense)}
        />
      ))}

      {editingExpense && (
        <EditExpenseForm
          expense={editingExpense}
          onUpdate={(updatedExpense) => {
            onUpdate(updatedExpense);
            setEditingExpense(null);
          }}
          onClose={() => setEditingExpense(null)}
      />
      )}
    </div>
  );
};

export default Expenses;