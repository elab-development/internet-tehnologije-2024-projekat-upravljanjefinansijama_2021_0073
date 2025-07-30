import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCard from "./ExpenseCard";
import EditExpenseForm from "./EditExpenseForm";
import '../Shared.css'; 

const Expenses = ({ onUpdate }) => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filter, setFilter] = useState({
    category: "",
    min_amount: "",
    max_amount: "",
    start_date: "",
    end_date: "",
  });

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("/expenses/filter", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data.data);
      setFilteredExpenses(response.data.data);
    } catch (error) {
      console.error("Greška pri dohvatanju troškova:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchExpenses(); 
  }, []);

  const handleDeleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const expenseToDelete = expenses.find(exp => exp.id === expenseId);
      await axios.delete(`/budgets/${expenseToDelete.budget_id}/expenses/${expenseId}`, config);
      await fetchExpenses(); 
    } catch (error) {
      console.error("Greška pri brisanju troška:", error.response?.data || error.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const params = Object.fromEntries(Object.entries(filter).filter(([_, v]) => v !== ""));
      const response = await axios.get("/expenses/filter", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setFilteredExpenses(response.data.data);
    } catch (error) {
      console.error("Greška pri filtriranju troškova:", error.response?.data || error.message);
    }
  };

  const clearFilter = () => {
    setFilter({ category: "", min_amount: "", max_amount: "", start_date: "", end_date: "" });
    setFilteredExpenses(expenses);
  };

  return (
    <div className="column">
      {/* --- Filter forma --- */}
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <input type="text" name="category" value={filter.category} onChange={handleFilterChange} placeholder="Kategorija" className="form-input" />
        <input type="number" name="min_amount" value={filter.min_amount} onChange={handleFilterChange} placeholder="Min. iznos" className="form-input" />
        <input type="number" name="max_amount" value={filter.max_amount} onChange={handleFilterChange} placeholder="Max. iznos" className="form-input" />
        <input type="date" name="start_date" value={filter.start_date} onChange={handleFilterChange} className="form-input" />
        <input type="date" name="end_date" value={filter.end_date} onChange={handleFilterChange} className="form-input" />
        <div className="form-actions">
            <button type="submit" className="btn btn-primary">Filter</button>
            <button type="button" onClick={clearFilter} className="btn btn-secondary">Očisti</button>
        </div>
      </form>

      {/* --- Prikaz troškova --- */}
      {filteredExpenses.length === 0 ? (
        <p>Nema troškova za izabrane kriterijume.</p>
      ) : (
        filteredExpenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} onDelete={handleDeleteExpense} onEdit={() => setEditingExpense(expense)} />
        ))
      )}

      {/* --- Forma za izmenu --- */}
      {editingExpense && (
        <EditExpenseForm
          expense={editingExpense}
          onUpdate={(updatedExpense) => {
            onUpdate(updatedExpense);
            fetchExpenses();
            setEditingExpense(null);
          }}
          onClose={() => setEditingExpense(null)}
        />
      )}
    </div>
  );
};

export default Expenses;