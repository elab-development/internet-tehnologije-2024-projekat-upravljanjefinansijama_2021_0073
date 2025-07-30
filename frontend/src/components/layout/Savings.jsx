import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="container mt-5">
      <h1 style={{ color: '#113F67' }}>Savings</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : savings !== null ? (
        <p>Your total savings: <strong>${savings.toFixed(2)}</strong></p>
      ) : (
        <p>Loading savings...</p>
      )}
    </div>
  );
};

export default Savings;