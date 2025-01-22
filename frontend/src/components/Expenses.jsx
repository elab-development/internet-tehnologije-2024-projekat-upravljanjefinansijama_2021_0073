import React from "react";
import ExpenseCard from "./ExpenseCard";

const Expenses = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return <p>No expenses found.</p>;
  }

  return (
    <div>
      {expenses.map((expense, index) => (
        <ExpenseCard
          key={expense.id || `expense-${index}`} 
          expense={expense}
        />
      ))}
    </div>
  );
};

export default Expenses;
