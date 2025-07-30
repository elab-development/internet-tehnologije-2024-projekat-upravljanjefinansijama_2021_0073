import React, { useState, useEffect } from "react";
import axios from "axios";
import IncomeCard from "./IncomeCard";
import EditIncomeForm from "./EditIncomeForm";
import '../Shared.css'; 

const Incomes = ({ incomes: initialIncomes, budgetId, onUpdate }) => {
  const [incomes, setIncomes] = useState(initialIncomes || []);
  const [editingIncome, setEditingIncome] = useState(null);

  useEffect(() => {
    setIncomes(initialIncomes || []);
  }, [initialIncomes]);

  const handleDeleteIncome = async (incomeId) => {
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.delete(`/budgets/${budgetId}/incomes/${incomeId}`, config);
      setIncomes((prevIncomes) => prevIncomes.filter((income) => income.id !== incomeId));
    } catch (error) {
      console.error("Greška pri brisanju prihoda:", error.response?.data || error.message);
    }
  };

  return (
    <div className="column">
      {incomes.length === 0 ? (
        <p>Nema unetih prihoda.</p>
      ) : (
        incomes.map((income) => (
          <IncomeCard
            key={income.id}
            income={income}
            onDelete={handleDeleteIncome}
            onEdit={() => setEditingIncome(income)}
          />
        ))
      )}

      {editingIncome && (
        <EditIncomeForm
          income={editingIncome}
          onUpdate={(updatedIncome) => {
            onUpdate(updatedIncome); 
            setEditingIncome(null);
          }}
          onClose={() => setEditingIncome(null)}
        />
      )}
    </div>
  );
};

export default Incomes;