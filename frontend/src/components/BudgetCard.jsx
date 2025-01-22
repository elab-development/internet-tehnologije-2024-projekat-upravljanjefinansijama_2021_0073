import React from 'react';
import { useNavigate } from 'react-router-dom';

const BudgetCard = ({ budget, onDelete, onEdit }) => {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ width: '18rem', margin: '1rem', cursor:"pointer" }}>
      <div className="card-body">
        <h5 className="card-title">{budget.category}</h5>
        <p className="card-text">
          <strong>Limit:</strong> ${budget.limit} <br />
          <strong>Start Date:</strong> {budget.start_date} <br />
          <strong>End Date:</strong> {budget.end_date}
        </p>
        <button type="button" className="btn btn-primary" onClick={onEdit}>
          Update
        </button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={() => onDelete(budget.id)}
        >
          Delete
        </button>

        <button
          type="button"
          className="btn btn-info ms-2"
          onClick={() => navigate(`/budgets/${budget.id}/info`)}
        >
          Info
      </button>
      </div>
    </div>
  );
};

export default BudgetCard;