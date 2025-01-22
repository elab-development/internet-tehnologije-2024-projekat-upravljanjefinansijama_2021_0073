import React from "react";

const ExpenseCard = ({ expense }) => {
  const handleUpdate = () => {
    console.log("Update Expense logic here for", expense.id);
  };

  const handleDelete = () => {
    console.log("Delete Expense logic here for", expense.id);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">Amount: ${expense.amount}</p>
        <p className="card-text">Description: {expense.description}</p>
        <p className="card-text">Date: {expense.date}</p>
        <button className="btn btn-warning me-2" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;