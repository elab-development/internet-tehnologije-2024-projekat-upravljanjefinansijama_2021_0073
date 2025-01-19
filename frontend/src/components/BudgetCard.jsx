import React from 'react';

const BudgetCard = ({ budget, onDelete }) => {
  return (
    <div className="card" style={{ width: '18rem', margin: '1rem' }}>
      {/* Placeholder za sliku (može se kasnije zameniti dinamičkim izvorom slike) */}
      <div className="card-body">
        <h5 className="card-title">{budget.category}</h5>
        <p className="card-text">
          <strong>Limit:</strong> ${budget.limit} <br />
          <strong>Start Date:</strong> {budget.start_date} <br />
          <strong>End Date:</strong> {budget.end_date}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => console.log('Update budget:', budget.id)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={() => onDelete(budget.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BudgetCard;