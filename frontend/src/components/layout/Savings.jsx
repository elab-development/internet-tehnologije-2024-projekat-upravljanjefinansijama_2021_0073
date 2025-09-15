import axios from 'axios';
import { useEffect, useState } from 'react';

const Savings = () => {
  const [savings, setSavings] = useState(null);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [rate, setRate] = useState(1);

  const baseCurrency = 'USD';

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const res = await axios.get('/savings', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
        });
        setSavings(Number(res.data.savings));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchSavings();
  }, []);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        if (currency === baseCurrency) {
          setRate(1);
          return;
        }
        const url = `https://open.er-api.com/v6/latest/${baseCurrency}`;
        const { data } = await axios.get(url);
        const r = data?.rates?.[currency];

        if (typeof r === 'number') {
          setRate(r);
        } else {
          setRate(1);
          console.warn('Rate missing for currency:', currency, data?.rates);
        }
      } catch (e) {
        setRate(1);
        console.error('Rate fetch failed', e);
      }
    };
    if (currency) fetchRate();
  }, [currency]);

  const converted = savings != null ? (savings * rate).toFixed(2) : null;

  return (
    <div className="page-container">
      <h1 className="page-title">Ušteđevina</h1>
      <div className="content-card stats-card">
        {error ? (
          <p style={{ color: 'red' }}>Greška: {error}</p>
        ) : savings !== null ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <label>Valuta:</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option>USD</option>
                <option>EUR</option>
                <option>RSD</option>
                <option>GBP</option>
              </select>
            </div>
            <h2>Vaša ukupna ušteđevina:</h2>
            <p className="amount">
              {currency} {converted}
            </p>
          </>
        ) : (
          <p>Učitavanje ušteđevine...</p>
        )}
      </div>
    </div>
  );
};

export default Savings;
