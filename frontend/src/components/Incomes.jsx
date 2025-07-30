import React from "react";
import IncomeCard from "./IncomeCard";
import { useState } from "react";
import axios from "axios";
import EditIncomeForm from "./EditIncomeForm";

const Incomes = ({ incomes: initialIncomes, budgetId, onUpdate }) => {
  const [incomes, setIncomes] = useState(initialIncomes || []);
  const [editingIncome, setEditingIncome] = useState(null);

  const handleDeleteIncome = async (incomeId) => {
    try {
      const token = localStorage.getItem("access_token");

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      await axios.delete(`/budgets/${budgetId}/incomes/${incomeId}`, config);

      setIncomes((prevIncomes) =>
        prevIncomes.filter((income) => income.id !== incomeId)
      );

      console.log(`Income with ID ${incomeId} successfully deleted.`);
    } catch (error) {
      console.error("Error deleting income:", error.response?.data || error.message);
    }
  };
  if (!incomes || incomes.length === 0) {
    return <p>No incomes found.</p>;
  }

  return (
    <div>
      {incomes.map((income) => (
        <IncomeCard 
          key={income.id} 
          income={income} 
          budgetId={budgetId}
          onDelete={handleDeleteIncome}
          onEdit={() => setEditingIncome(income)}
        />
      ))}

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