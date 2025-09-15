import React, { useState, useEffect } from "react";
import Expenses from "../expense/Expenses";
import Incomes from "../income/Incomes";
import CreateExpenseForm from "../expense/CreateExpenseForm";
import CreateIncomeForm from "../income/CreateIncomesForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';
import '../Shared.css';

const getErrorMessage = (error) => {
    const errors = error.response?.data;
    if (errors && typeof errors === 'object') {
        const firstErrorKey = Object.keys(errors)[0];
        return errors[firstErrorKey][0] || "An unknown validation error occurred.";
    }
    return error.response?.data?.message || "An unexpected error occurred.";
};


const BudgetInfo = () => {
    const { budgetId } = useParams();
    const [budgetDetails, setBudgetDetails] = useState({
        expenses: [],
        incomes: [],
    });
    const [budgetCategory, setBudgetCategory] = useState("");
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showIncomeForm, setShowIncomeForm] = useState(false);

    const fetchBudgetDetails = async () => {
        const token = localStorage.getItem("access_token");
        const headers = { Authorization: `Bearer ${token}` };
        try {
            const [budgetRes, expensesRes, incomesRes] = await Promise.all([
                axios.get(`/budgets/${budgetId}`, { headers }),
                axios.get(`/budgets/${budgetId}/expenses`, { headers }),
                axios.get(`/budgets/${budgetId}/incomes`, { headers })
            ]);
            setBudgetCategory(budgetRes.data.budget.category);
            setBudgetDetails({
                expenses: expensesRes.data.expenses || [],
                incomes: incomesRes.data.incomes || [],
            });
        } catch (error) {
            console.error("Error fetching budget details:", error);
            toast.error("Greška u učitavanju budžeta.");
        }
    };

    useEffect(() => {
        fetchBudgetDetails();
    }, [budgetId]);


    const handleCreateExpense = async (newExpense) => {
        const promise = axios.post(`/budgets/${budgetId}/expenses`, newExpense, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });

        toast.promise(promise, {
            loading: 'Dodavanje troška...',
            success: <b>Trošak je uspešno dodat!</b>,
            error: (err) => <b>{getErrorMessage(err)}</b>,
        });

        try {
            await promise;
            fetchBudgetDetails();
            setShowExpenseForm(false);
        } catch (error) {
            console.error("Error creating expense:", error.response?.data || error);
        }
    };

    const handleUpdateExpense = async (updatedExpense) => {
        const promise = axios.put(
            `/budgets/${budgetId}/expenses/${updatedExpense.id}`,
            updatedExpense,
            { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        );

        toast.promise(promise, {
            loading: 'Ažuriranje troška...',
            success: <b>Trošak je uspešno ažuriran!</b>,
            error: (err) => <b>{getErrorMessage(err)}</b>, 
        });

        try {
            await promise;
            fetchBudgetDetails();
        } catch (error) {
            console.error("Error updating expense:", error.response?.data || error);
        }
    };

    const handleCreateIncome = async (newIncome) => {
        const promise = axios.post(`/budgets/${budgetId}/incomes`, newIncome, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });

        toast.promise(promise, {
            loading: 'Dodavanje prihoda...',
            success: <b>Prihod je uspešno dodat!</b>,
            error: (err) => <b>{getErrorMessage(err)}</b>,
        });

        try {
            await promise;
            fetchBudgetDetails();
            setShowIncomeForm(false);
        } catch (error) {
            console.error("Error creating income:", error.response?.data || error);
        }
    };

    const handleUpdateIncome = async (updatedIncome) => {
        const promise = axios.put(
            `/budgets/${budgetId}/incomes/${updatedIncome.id}`,
            updatedIncome,
            { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        );

        toast.promise(promise, {
            loading: 'Ažuriranje prihoda...',
            success: <b>Prihod je ažuriran!</b>,
            error: (err) => <b>{getErrorMessage(err)}</b>, 
        });

        try {
            await promise;
            fetchBudgetDetails();
        } catch (error) {
            console.error("Error updating income:", error.response?.data || error);
        }
    };

    return (
        <div className="page-container">
            <Toaster position="top-center" reverseOrder={false} />
            <h1 className="page-title">{budgetCategory} Budget Details</h1>

            <div className="details-container">
                <div className="column">
                    <div className="column-header">
                        <h3>Troškovi</h3>
                        <button className="btn btn-primary" onClick={() => setShowExpenseForm(true)}>
                            + Dodaj trošak
                        </button>
                    </div>
                    <Expenses
                        expensesProp={budgetDetails.expenses} 
                        budgetId={budgetId}
                        onUpdate={handleUpdateExpense}
                        onDeleteSuccess={fetchBudgetDetails}
                    />
                </div>

                <div className="column">
                    <div className="column-header">
                        <h3>Prihodi</h3>
                        <button className="btn btn-primary" onClick={() => setShowIncomeForm(true)}>
                            + Dodaj Prihod
                        </button>
                    </div>
                    <Incomes
                        incomes={budgetDetails.incomes}
                        budgetId={budgetId}
                        onUpdate={handleUpdateIncome}
                        onDeleteSuccess={fetchBudgetDetails}
                    />
                </div>
            </div>

            {showExpenseForm && (
                <CreateExpenseForm
                    onCreate={handleCreateExpense}
                    onClose={() => setShowExpenseForm(false)}
                    budgetId={budgetId}
                />
            )}
            {showIncomeForm && (
                <CreateIncomeForm
                    onCreate={handleCreateIncome}
                    onClose={() => setShowIncomeForm(false)}
                    budgetId={budgetId}
                />
            )}
        </div>
    );
};

export default BudgetInfo;