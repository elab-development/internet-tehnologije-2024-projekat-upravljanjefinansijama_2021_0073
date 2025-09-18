import { useEffect, useState } from "react";
import api from "../services/api";

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

export default function ExportsPanel() {
  const [budgets, setBudgets] = useState([]);
  const [budgetId, setBudgetId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    api.Budgets.list()
      .then((res) => setBudgets(res.budgets || res.data || []))
      .catch(() => setBudgets([]));
  }, []);

  const exportCsv = async () => {
    setDownloading(true);
    try {
      const { data, headers } = await api.Exports.csv({
        budget_id: budgetId || undefined,
        from: from || undefined,
        to: to || undefined,
      });
      const fname = headers && headers["content-disposition"]
        ? (headers["content-disposition"].match(/filename="?([^"]+)"?/)?.[1] || "expenses.csv")
        : "expenses.csv";
      downloadBlob(new Blob([data], { type: headers["content-type"] || "text/csv" }), fname);
    } finally { setDownloading(false); }
  };

  const exportPdf = async () => {
    setDownloading(true);
    try {
      const { data, headers } = await api.Exports.pdf({
        from: from || undefined,
        to: to || undefined,
      });
      const fname = (headers["content-disposition"]?.match(/filename="?([^"]+)"?/)?.[1]) || "report.pdf";
      downloadBlob(new Blob([data], { type: headers["content-type"] || "application/pdf" }), fname);
    } finally { setDownloading(false); }
  };

  return (
    <section className="tool-card">
      <div className="tool-header">
        <h3 className="tool-title">Export</h3>
        <p className="tool-subtitle">CSV i PDF izveštaji</p>
      </div>

      <div className="tool-form">
        <div className="field w-4">
          <label>Budžet (opciono)</label>
          <select className="select" value={budgetId} onChange={e=>setBudgetId(e.target.value)}>
            <option value="">Svi</option>
            {budgets.map(b => <option key={b.id} value={b.id}>{b.name || b.title || `#${b.id}`}</option>)}
          </select>
        </div>
        <div className="field w-4">
          <label>Od</label>
          <input type="date" className="input" value={from} onChange={e=>setFrom(e.target.value)}/>
        </div>
        <div className="field w-4">
          <label>Do</label>
          <input type="date" className="input" value={to} onChange={e=>setTo(e.target.value)}/>
        </div>
      </div>

      <div className="tool-actions">
        <button className="btn btn-outline-primary" onClick={exportCsv} disabled={downloading}>
          {downloading ? "..." : "Preuzmi CSV"}
        </button>
        <button className="btn btn-outline-danger" onClick={exportPdf} disabled={downloading}>
          {downloading ? "..." : "Preuzmi PDF"}
        </button>
      </div>

      <p className="muted" style={{ marginTop:6 }}>
        Ako ne unesete datume, koristi se podrazumevani opseg od 6 meseci.
      </p>
    </section>
  );
}
