import React from "react";
import '../Shared.css';
import ReceiptsWidget from "../ReceiptsWidget";

const ExpenseCard = ({ expense, onDelete, onEdit }) => {
  return (
    <div className="item-card">
      <div className="item-card-content">
        <p><strong>Iznos:</strong> ${parseFloat(expense.amount).toFixed(2)}</p>
        <p><strong>Opis:</strong> {expense.description}</p>
        <p><strong>Datum:</strong> {new Date(expense.date).toLocaleDateString('sr-RS')}</p>
      </div>
      <div className="item-card-actions">
        <button className="btn btn-update" onClick={onEdit}>Izmeni</button>
        <button className="btn btn-delete" onClick={() => onDelete(expense.id)}>Obriši</button>
      </div>

      <ReceiptsWidget expenseId={expense.id} />
    </div>
  );
};

export default ExpenseCard;