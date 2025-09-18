import { useState } from "react";
import api from "../services/api";

export default function FXConverter() {
  const [from, setFrom] = useState("RSD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1000);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const convert = async () => {
    setLoading(true);
    try {
      const data = await api.Exchange.convert({ from, to, amount });
      setResult(data);
    } finally { setLoading(false); }
  };

  return (
    <section className="tool-card">
      <div className="tool-header">
        <h3 className="tool-title">FX konverzija</h3>
        <p className="tool-subtitle">Brza konverzija između valuta</p>
      </div>

      <div className="tool-form">
        <div className="field w-3">
          <label>Iz</label>
          <input className="input" value={from} onChange={e=>setFrom(e.target.value.toUpperCase())}/>
        </div>
        <div className="field w-3">
          <label>U</label>
          <input className="input" value={to} onChange={e=>setTo(e.target.value.toUpperCase())}/>
        </div>
        <div className="field w-3">
          <label>Iznos</label>
          <input type="number" className="input" value={amount} onChange={e=>setAmount(e.target.value)}/>
        </div>
        <div className="field w-3" style={{ display:"flex", alignItems:"end" }}>
          <button className="btn btn-primary w-100" onClick={convert} disabled={loading}>
            {loading ? "..." : "Konvertuj"}
          </button>
        </div>
      </div>

      {result && (
        <div style={{ marginTop:12 }}>
          <span className="kpi">Kurs: {result.rate}</span>
          <div style={{ marginTop:8 }}>
            <strong>{result.amount}</strong> {result.from} → <strong>{result.converted}</strong> {result.to}
          </div>
        </div>
      )}
    </section>
  );
}
