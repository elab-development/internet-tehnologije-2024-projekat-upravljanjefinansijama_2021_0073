import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Shared.css';

const MaxExpense = () => {
  const [maxExpense, setMaxExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaxExpense = async () => {
      try {
        const response = await axios.get('/expenses/max-category', {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
          });
        setMaxExpense(response.data);
      } catch (error) {
        console.error('Greška pri dohvatanju maksimalnog troška:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaxExpense();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Maksimalni Trošak</h1>
      <div className="content-card stats-card">
         {loading ? (
            <p>Učitavanje...</p>
         ) : !maxExpense || !maxExpense.category ? (
            <p>Nema unetih troškova.</p>
         ) : (
            <>
                <h2>Kategorija sa najvećim troškom:</h2>
                <p style={{fontSize: '2rem', fontWeight: '600', margin: '10px 0'}}>{maxExpense.category}</p>
                <p className="amount">${parseFloat(maxExpense.amount).toFixed(2)}</p>
            </>
         )}
      </div>
    </div>
  );
};

export default MaxExpense;