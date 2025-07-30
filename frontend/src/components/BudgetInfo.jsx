import React, { useState, useEffect } from "react";
import Expenses from "./Expenses";
import Incomes from "./Incomes";
import CreateExpenseForm from "./CreateExpenseForm";
import CreateIncomeForm from "./CreateIncomesForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const BudgetInfo = () => {
  const { budgetId } = useParams();
  const [budgetDetails, setBudgetDetails] = useState({
    //category: "",
    expenses: [],
    incomes: [],
  });

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  useEffect(() => {
    const fetchBudgetDetails = async () => {
      try {
        const budgetResponse = await axios.get(`/budgets/${budgetId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
  
        // dohvatanje troskova
        const expensesResponse = await axios.get(`/budgets/${budgetId}/expenses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
  
        // dohvatanje prihoda
        const incomesResponse = await axios.get(`/budgets/${budgetId}/incomes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
  
        setBudgetDetails({
          //...budgetResponse.data,
          //category: budgetResponse.data.budget.category,
          expenses: expensesResponse.data.expenses || [],
          incomes: incomesResponse.data.incomes || [],
        });
      } catch (error) {
        console.error("Error fetching budget details:", error);
      }
    };
  
    fetchBudgetDetails();
  }, [budgetId]);
  

  const handleCreateExpense = async (newExpense) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `/budgets/${budgetId}/expenses`,
        newExpense,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setBudgetDetails((prev) => ({
        ...prev,
        expenses: [...prev.expenses, response.data], 
      }));
  
      setShowExpenseForm(false);
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };
  

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        `/budgets/${budgetId}/expenses/${updatedExpense.id}`,
        updatedExpense,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setBudgetDetails((prev) => ({
        ...prev,
        expenses: prev.expenses.map((expense) =>
          expense.id === updatedExpense.id ? { ...response.data } : expense
        ),
      }));
    } catch (error) {
      console.error("Error updating expense:", error.response?.data || error.message);
    }
  };
  const handleUpdateIncome = async (updatedIncome) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        `/budgets/${budgetId}/incomes/${updatedIncome.id}`,
        updatedIncome,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setBudgetDetails((prev) => ({
        ...prev,
        incomes: prev.incomes.map((income) =>
          income.id === updatedIncome.id ? { ...response.data } : income
        ),
      }));
    } catch (error) {
      console.error("Error updating income:", error.response?.data || error.message);
    }
  };
  const handleCreateIncome = async (newIncome) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `/budgets/${budgetId}/incomes`,
        newIncome,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBudgetDetails((prev) => ({
        ...prev,
        incomes: Array.isArray(prev.incomes) ? [...prev.incomes, response.data] : [response.data],
      }));
      setShowIncomeForm(false);
    } catch (error) {
      console.error("Error creating income:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h3>Expenses</h3>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowExpenseForm(true)}
          >
            Create Expense
          </button>
          <Expenses
            key={budgetDetails.expenses.length}
            expenses={Array.isArray(budgetDetails.expenses) ? budgetDetails.expenses : []}
            budgetId={budgetId}
            onUpdate={handleUpdateExpense}
          />
        </div>

        <div className="col-md-6">
          <h3>Incomes</h3>
          <button
            className="btn btn-success mb-3"
            onClick={() => setShowIncomeForm(true)}
          >
            Create Income
          </button>
          <Incomes
            key={budgetDetails.incomes.length}
            incomes={Array.isArray(budgetDetails.incomes) ? budgetDetails.incomes : []}
            budgetId={budgetId}
            onUpdate={handleUpdateIncome}
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
