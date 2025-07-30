import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Shared.css'; 

const Savings = () => {
  const [savings, setSavings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response = await axios.get('/savings', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        });
        setSavings(response.data.savings);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSavings();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Ušteđevina</h1>
      <div className="content-card stats-card">
        {error ? (
          <p style={{ color: 'red' }}>Greška: {error}</p>
        ) : savings !== null ? (
          <>
            <h2>Vaša ukupna ušteđevina:</h2>
            <p className="amount">${savings.toFixed(2)}</p>
          </>
        ) : (
          <p>Učitavanje ušteđevine...</p>
        )}
      </div>
    </div>
  );
};

export default Savings;