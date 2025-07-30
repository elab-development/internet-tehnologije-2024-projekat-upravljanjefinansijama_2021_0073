import React, { useState, useEffect } from 'react';
import BudgetCard from './BudgetCard';
import UpdateBudgetForm from './UpdateBudgetForm'; 
import CreateBudgetForm from './CreateBudgetForm';
import axios from 'axios';

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
    <div>
      <h1 style={{ color: '#113F67', fontSize: 36, fontWeight: 700 }}>My Budgets</h1>
      <button type="button" className="btn btn-light" onClick={() => setIsCreateFormOpen(true)}>
        Create Budget
      </button>
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
      <div className="row">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onDelete={handleDelete}
            onEdit={() => setSelectedBudget(budget)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Budgets;