import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCard from "./ExpenseCard";
import EditExpenseForm from "./EditExpenseForm";

const Expenses = ({ expenses: initialExpenses, onUpdate }) => {
  const [expenses, setExpenses] = useState(initialExpenses || []);
  const [filteredExpenses, setFilteredExpenses] = useState(initialExpenses || []);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filter, setFilter] = useState({
    category: "",
    min_amount: "",
    max_amount: "",
    start_date: "",
    end_date: "",
  });

  // 🔁 Učitaj sve troškove
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("/expenses/filter", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses(response.data.data);
      setFilteredExpenses(response.data.data);
    } catch (error) {
      console.error("Error fetching expenses:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Inicijalno učitavanje sa servera
  }, []);

  // Ažuriraj filteredExpenses kad god se promeni kompletna lista
  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const handleDeleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const expenseToDelete = expenses.find(exp => exp.id === expenseId);

      await axios.delete(`/budgets/${expenseToDelete.budget_id}/expenses/${expenseId}`, config);

      // Sveže povlačenje troškova nakon brisanja
      await fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data || error.message);
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

      const params = Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v !== "")
      );

      console.log("Filter params:", params);

      const response = await axios.get("/expenses/filter", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setFilteredExpenses(response.data.data);
    } catch (error) {
      console.error("Error filtering expenses:", error.response?.data || error.message);
    }
  };

  const clearFilter = () => {
    setFilter({
      category: "",
      min_amount: "",
      max_amount: "",
      start_date: "",
      end_date: "",
    });
    setFilteredExpenses(expenses);
  };

  return (
    <div>
      {/* --- Filter forma --- */}
      <form onSubmit={handleFilterSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        <input
          type="text"
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          placeholder="Category"
        />
        <input
          type="number"
          name="min_amount"
          value={filter.min_amount}
          onChange={handleFilterChange}
          placeholder="Min Amount"
        />
        <input
          type="number"
          name="max_amount"
          value={filter.max_amount}
          onChange={handleFilterChange}
          placeholder="Max Amount"
        />
        <input
          type="date"
          name="start_date"
          value={filter.start_date}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="end_date"
          value={filter.end_date}
          onChange={handleFilterChange}
        />
        <button type="submit">Filter</button>
        <button type="button" onClick={clearFilter} style={{ marginLeft: '10px' }}>Clear Filter</button>
      </form>

      {/* --- Prikaz troškova --- */}
      {filteredExpenses.length === 0 ? (
        <p>No expenses found for the selected criteria.</p>
      ) : (
        filteredExpenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            budgetId={expense.budget_id}
            onDelete={handleDeleteExpense}
            onEdit={() => setEditingExpense(expense)}
          />
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
