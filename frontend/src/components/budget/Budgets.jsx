import React, { useState, useEffect } from 'react';
import BudgetCard from './BudgetCard';
import UpdateBudgetForm from './UpdateBudgetForm'; 
import CreateBudgetForm from './CreateBudgetForm';
import axios from 'axios';
import './Budgets.css';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null); 

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('/budgets', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      setBudgets(response.data.budgets);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const handleCreate = async (newBudget) => {
    try {
      await axios.post('/budgets', newBudget, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      fetchBudgets();
      setIsCreateFormOpen(false);
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  const handleDelete = async (budgetId) => {
    try {
      await axios.delete(`/budgets/${budgetId}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      setBudgets(budgets.filter((budget) => budget.id !== budgetId));
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  const handleUpdate = async (budgetId, updatedBudget) => {
    try {
      await axios.put(`/budgets/${budgetId}`, updatedBudget, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      fetchBudgets();
      setSelectedBudget(null); 
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  return (
    // Dodajemo kontejner sa novim klasama
    <div className="budgets-container"> 
      <div className="header">
        <h1>My Budgets</h1>
        <button className="btn-create" onClick={() => setIsCreateFormOpen(true)}>
          + Create Budget
        </button>
      </div>

      {/* Forme za kreiranje i ažuriranje (tvoja postojeća logika) */}
      {isCreateFormOpen && (
        <CreateBudgetForm onCreate={handleCreate} onClose={() => setIsCreateFormOpen(false)} />
      )}
      {selectedBudget && (
        <UpdateBudgetForm
          budget={selectedBudget}
          onUpdate={handleUpdate}
          onClose={() => setSelectedBudget(null)}
        />
      )}

      {/* Grid za prikaz budžeta */}
      <div className="budgets-grid">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onDelete={handleDelete}
            onEdit={() => setSelectedBudget(budget)} 
          />
        ))}
      </div>
      <div className="floating-icons">
        <span>💸</span>
        <span>📈</span>
        <span>💰</span>
        <span>📊</span>
        <span>💵</span>
      </div>
    </div>
  );
};

export default Budgets;