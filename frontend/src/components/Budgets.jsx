import React, { useState, useEffect } from 'react';
import BudgetCard from './BudgetCard';
import CreateBudgetForm from './CreateBudgetForm';
import axios from 'axios';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('/budgets', {
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem("access_token")
        },
      });
      setBudgets((response.data)["budgets"]);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const handleCreate = async (newBudget) => {
    try {
      await axios.post('/budgets', newBudget, {
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem("access_token"),
        },
      });
      fetchBudgets(); // Ponovno učitavanje budžeta sa servera
      setIsCreateFormOpen(false); // Zatvori formu
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  const handleDelete = async (budgetId) => {
    try {
      await axios.delete(`/budgets/${budgetId}`, {
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem("access_token"),
        },
      });
      setBudgets(budgets.filter((budget) => budget.id !== budgetId)); // Ukloni budžet iz liste
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  return (
    <div>
      <h1 style={{color: 'white', fontSize: 36, fontWeight: 700}}>My Budgets</h1>
      <button type="button" class="btn btn-light" onClick={() => setIsCreateFormOpen(true)}>Create Budget</button>
      {isCreateFormOpen && (
        <CreateBudgetForm
            onCreate={handleCreate}
            onClose={() => setIsCreateFormOpen(false)}
        />
      )}
      <div className="row">
        {budgets.map((budget) => (
            <div className="col-md-4" key={budget.id}>
            <BudgetCard budget={budget} onDelete={handleDelete} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default Budgets;