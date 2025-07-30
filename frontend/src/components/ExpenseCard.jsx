import React from "react";

const ExpenseCard = ({ expense, onDelete, onEdit }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">Amount: ${expense.amount}</p>
        <p className="card-text">Description: {expense.description}</p>
        <p className="card-text">Date: {expense.date}</p>
        <button
          className="btn btn-warning me-2"
          onClick={onEdit} 
        >
          Update
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(expense.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;