import React from "react";

const IncomeCard = ({ income }) => {
  const handleUpdate = () => {
    console.log("Update Income logic here for", income.id);
  };

  const handleDelete = () => {
    console.log("Delete Income logic here for", income.id);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">Amount: ${income.amount}</p>
        <p className="card-text">Source: {income.source}</p>
        <p className="card-text">Date: {income.date}</p>
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

export default IncomeCard;