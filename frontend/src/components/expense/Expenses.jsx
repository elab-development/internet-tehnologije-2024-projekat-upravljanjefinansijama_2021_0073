import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCard from "./ExpenseCard";
import EditExpenseForm from "./EditExpenseForm";
import { toast } from 'react-hot-toast';
import '../Shared.css';

const Expenses = ({ expensesProp, budgetId, onUpdate, onDeleteSuccess }) => {
    const [filteredExpenses, setFilteredExpenses] = useState(expensesProp || []);
    const [editingExpense, setEditingExpense] = useState(null);
    const [filter, setFilter] = useState({
        category: "",
        min_amount: "",
        max_amount: "",
        start_date: "",
        end_date: "",
    });

    useEffect(() => {
        setFilteredExpenses(expensesProp || []);
    }, [expensesProp]);

    const handleDeleteExpense = (expenseId) => {
        const deleteAction = async () => {
            try {
                const token = localStorage.getItem("access_token");
                await axios.delete(`/budgets/${budgetId}/expenses/${expenseId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                onDeleteSuccess();
            } catch (error) {
                console.error("Greška pri brisanju troška:", error);
                throw error;
            }
        };

        toast((t) => (
            <div style={{ textAlign: 'center' }}>
                <p>Da li ste sigurni da želite da obrišete trošak?</p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button className="btn btn-delete" onClick={() => {
                        toast.dismiss(t.id);
                        toast.promise(deleteAction(), {
                            loading: 'Brisanje...',
                            success: <b>Trošak obrisan!</b>,
                            error: <b>Greška.</b>
                        });
                    }}>
                        Delete
                    </button>
                    <button className="btn btn-secondary" onClick={() => toast.dismiss(t.id)}>
                        Cancel
                    </button>
                </div>
            </div>
        ), { icon: '⚠️' });
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        let tempExpenses = [...expensesProp];

        if (filter.category) {
            tempExpenses = tempExpenses.filter(exp => exp.category.toLowerCase().includes(filter.category.toLowerCase()));
        }
        if (filter.min_amount) {
            tempExpenses = tempExpenses.filter(exp => parseFloat(exp.amount) >= parseFloat(filter.min_amount));
        }
        if (filter.max_amount) {
            tempExpenses = tempExpenses.filter(exp => parseFloat(exp.amount) <= parseFloat(filter.max_amount));
        }
        if (filter.start_date) {
            tempExpenses = tempExpenses.filter(exp => new Date(exp.date) >= new Date(filter.start_date));
        }
        if (filter.end_date) {
            tempExpenses = tempExpenses.filter(exp => new Date(exp.date) <= new Date(filter.end_date));
        }
        
        setFilteredExpenses(tempExpenses);
        toast.success('Filter applied!');
    };
    
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    const clearFilter = () => {
        setFilter({ category: "", min_amount: "", max_amount: "", start_date: "", end_date: "" });
        setFilteredExpenses(expensesProp); // Vraćamo na originalnu listu iz propsa
        toast.success('Filter cleared!');
    };

    return (
        <div>
            <form onSubmit={handleFilterSubmit} className="filter-form">
                <input type="text" name="category" value={filter.category} onChange={handleFilterChange} placeholder="Category" className="form-input" />
                <input type="number" name="min_amount" value={filter.min_amount} onChange={handleFilterChange} placeholder="Min. amount" className="form-input" />
                <input type="number" name="max_amount" value={filter.max_amount} onChange={handleFilterChange} placeholder="Max. amount" className="form-input" />
                <input type="date" name="start_date" value={filter.start_date} onChange={handleFilterChange} className="form-input" />
                <input type="date" name="end_date" value={filter.end_date} onChange={handleFilterChange} className="form-input" />
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Filter</button>
                    <button type="button" onClick={clearFilter} className="btn btn-secondary">Clear</button>
                </div>
            </form>

            {filteredExpenses.length === 0 ? (
                <p>No expenses found for the selected criteria.</p>
            ) : (
                filteredExpenses.map((expense) => (
                    <ExpenseCard key={expense.id} expense={expense} onDelete={handleDeleteExpense} onEdit={() => setEditingExpense(expense)} />
                ))
            )}

            {editingExpense && (
                <EditExpenseForm
                    expense={editingExpense}
                    budgetId={budgetId}
                    onUpdate={(updatedExpense) => {
                        onUpdate(updatedExpense);
                        setEditingExpense(null);
                    }}
                    onClose={() => setEditingExpense(null)}
                />
            )}
        </div>
    );
};

export default Expenses;