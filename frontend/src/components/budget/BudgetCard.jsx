// BudgetCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Ako želiš ikonice (preporuka!), instaliraj react-icons: npm install react-icons
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

const BudgetCard = ({ budget, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate(`/budgets/${budget.id}/info`);
  };

  return (
    <div className="budget-card">
      <h3>{budget.category}</h3>
      <p><strong>Limit:</strong> ${parseFloat(budget.limit).toFixed(2)}</p>
      <p><strong>Start Date:</strong> {new Date(budget.start_date).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(budget.end_date).toLocaleDateString()}</p>
      
      <div className="card-actions">
        <button onClick={onEdit} className="card-btn btn-update">
          <FaEdit /> Update
        </button>
        <button onClick={() => onDelete(budget.id)} className="card-btn btn-delete">
          <FaTrash /> Delete
        </button>
        <button onClick={handleInfoClick} className="card-btn btn-info">
          <FaInfoCircle /> Info
        </button>
      </div>
    </div>
  );
};

export default BudgetCard;