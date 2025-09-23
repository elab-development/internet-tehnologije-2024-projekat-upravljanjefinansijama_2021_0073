import React, { useState, useEffect } from 'react';
import BudgetCard from './BudgetCard';
import UpdateBudgetForm from './UpdateBudgetForm';
import CreateBudgetForm from './CreateBudgetForm';
import axios from 'axios';
import './Budgets.css';
import { Toaster, toast } from 'react-hot-toast';

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
            toast.error("Greska u prikazivanju budžeta.");
        }
    };

    const handleCreate = async (newBudget) => {
        const promise = axios.post('/budgets', newBudget, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
        });

        toast.promise(promise, {
            loading: 'Kreiranje novog budžeta...',
            success: <b>Budžet uspešno kreiran!</b>,
            error: <b>Neuspelo kreiranje budžeta.</b>,
        });

        try {
            await promise;
            fetchBudgets(); 
            setIsCreateFormOpen(false);
        } catch (error) {
            console.error('Error creating budget:', error);
        }
    };

    const handleDelete = (budgetId) => {
        const deleteBudget = async () => {
            try {
                await axios.delete(`/budgets/${budgetId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    },
                });
                setBudgets(prevBudgets => prevBudgets.filter((budget) => budget.id !== budgetId));
            } catch (error) {
                console.error('Error deleting budget:', error);
                throw error;
            }
        };

        toast((t) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <span style={{ textAlign: 'center' }}>
                    Da li ste sigurni da želite da obrišete budžet? <br /> Ova akcija se ne može poništiti.
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={() => {
                            toast.dismiss(t.id); 

                            toast.promise(deleteBudget(), {
                                loading: 'Brisanje budžeta...',
                                success: <b>Budžet obrisan!</b>,
                                error: <b>Neuspelo brisanje budžeta.</b>,
                            });
                        }}
                    >
                        Obriši
                    </button>
                    <button
                        style={{ background: '#6c757d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Odustani
                    </button>
                </div>
            </div>
        ), {
            icon: '⚠️',
            duration: 6000,
        });
    };

    const handleUpdate = async (budgetId, updatedBudget) => {
        const promise = axios.put(`/budgets/${budgetId}`, updatedBudget, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
        });

        toast.promise(promise, {
            loading: 'Ažuriranje budžeta...',
            success: <b>Budžet je uspešno ažuriran!</b>,
            error: <b>Neuspelo ažuriranje budžeta.</b>,
        });

        try {
            await promise;
            fetchBudgets();
            setSelectedBudget(null);
        } catch (error) {
            console.error('Error updating budget:', error);
        }
    };

    return (
        <div className="budgets-container">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="header">
                <h1>Moji budžeti</h1>
                <button className="btn-create" onClick={() => setIsCreateFormOpen(true)}>
                    + Kreiraj budžet
                </button>
            </div>

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

            <div className="budgets-grid">
                {budgets.map((budget) => (
                    <BudgetCard
                        key={budget.id}
                        budget={budget}
                        onDelete={handleDelete} // Sada poziva funkciju sa potvrdom
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