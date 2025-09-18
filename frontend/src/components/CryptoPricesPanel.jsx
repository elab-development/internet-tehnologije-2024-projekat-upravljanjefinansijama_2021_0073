import { useState } from "react";
import api from "../services/api";

export default function CryptoPricesPanel() {
  const [ids, setIds] = useState("bitcoin,ethereum,solana");
  const [fiat, setFiat] = useState("USD");
  const [display, setDisplay] = useState("RSD");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.Crypto.prices({ ids, fiat, display });
      setRows(data.prices || []);
    } finally { setLoading(false); }
  };

  return (
    <section className="tool-card">
      <div className="tool-header">
        <h3 className="tool-title">Kripto cene</h3>
        <p className="tool-subtitle">CoinGecko + FX prikaz</p>
      </div>

      <div className="tool-form">
        <div className="field w-6">
          <label>IDs (coingecko)</label>
          <input className="input" value={ids} onChange={e=>setIds(e.target.value)} placeholder="bitcoin,solana,ethereum"/>
        </div>
        <div className="field w-3">
          <label>Fiat</label>
          <input className="input" value={fiat} onChange={e=>setFiat(e.target.value.toUpperCase())}/>
        </div>
        <div className="field w-3">
          <label>Prikaži u</label>
          <input className="input" value={display} onChange={e=>setDisplay(e.target.value.toUpperCase())}/>
        </div>
      </div>

      <div className="tool-actions">
        <button className="btn btn-secondary" onClick={load} disabled={loading}>{loading?"...":"Učitaj"}</button>
      </div>

      {!!rows.length && (
        <div className="table-responsive" style={{ marginTop:12 }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Osnovna cena ({fiat})</th><th>Prikaz ({display})</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}><td>{r.id}</td><td>{r.price}</td><td>{r.display_price} {r.display_currency}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
