import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        console.error('Error fetching max expense:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaxExpense();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!maxExpense || !maxExpense.category) {
    return <div style={{color: 'white'}}>No expenses found.</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', color: '#113F67' }}>
      <h1>Maximum Expense</h1>
      <p>
        <strong>Category:</strong> {maxExpense.category}
      </p>
      <p>
        <strong>Amount:</strong> ${maxExpense.amount}
      </p>
    </div>
  );
};

export default MaxExpense;