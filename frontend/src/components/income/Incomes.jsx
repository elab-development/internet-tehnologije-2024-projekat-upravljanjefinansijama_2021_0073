import React, { useState, useEffect } from "react";
import axios from "axios";
import IncomeCard from "./IncomeCard";
import EditIncomeForm from "./EditIncomeForm";
import { toast } from 'react-hot-toast';
import '../Shared.css';

const Incomes = ({ incomes: initialIncomes, budgetId, onUpdate, onDeleteSuccess }) => {
    const [incomes, setIncomes] = useState(initialIncomes || []);
    const [editingIncome, setEditingIncome] = useState(null);

    useEffect(() => {
        setIncomes(initialIncomes || []);
    }, [initialIncomes]);

    const handleDeleteIncome = (incomeId) => {
        const deleteAction = async () => {
            try {
                const token = localStorage.getItem("access_token");
                await axios.delete(`/budgets/${budgetId}/incomes/${incomeId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                onDeleteSuccess(); 
            } catch (error) {
                console.error("Greška pri brisanju prihoda:", error);
                throw error;
            }
        };

        toast((t) => (
            <div style={{ textAlign: 'center' }}>
                <p>Are you sure you want to delete this income?</p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button className="btn btn-delete" onClick={() => {
                        toast.dismiss(t.id);
                        toast.promise(deleteAction(), {
                            loading: 'Brisanje...',
                            success: <b>Prihod obrisan!</b>,
                            error: <b>Neuspešno brisanje prihoda.</b>
                        });
                    }}>
                        Obriši
                    </button>
                    <button className="btn btn-secondary" onClick={() => toast.dismiss(t.id)}>
                        Odustani
                    </button>
                </div>
            </div>
        ), { icon: '⚠️' });
    };

    return (
        <div>
            {incomes.length === 0 ? (
                <p>Nema prihoda.</p>
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