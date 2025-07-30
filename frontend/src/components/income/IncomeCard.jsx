import React from "react";

const IncomeCard = ({ income, onDelete, onEdit }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">Amount: ${income.amount}</p>
        <p className="card-text">Source: {income.source}</p>
        <p className="card-text">Date: {income.date}</p>
        <button className="btn btn-warning me-2"
          onClick={onEdit}
        >
          Update
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(income.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default IncomeCard;