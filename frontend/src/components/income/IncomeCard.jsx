import React from "react";
import '../Shared.css'; 

const IncomeCard = ({ income, onDelete, onEdit }) => {
  return (
    <div className="item-card">
        <div className="item-card-content">
            <p><strong>Iznos:</strong> ${parseFloat(income.amount).toFixed(2)}</p>
            <p><strong>Izvor:</strong> {income.source}</p>
            <p><strong>Datum:</strong> {new Date(income.date).toLocaleDateString('sr-RS')}</p>
        </div>
      <div className="item-card-actions">
        <button className="btn btn-update" onClick={onEdit}>Izmeni</button>
        <button className="btn btn-delete" onClick={() => onDelete(income.id)}>Obriši</button>
      </div>
    </div>
  );
};

export default IncomeCard;