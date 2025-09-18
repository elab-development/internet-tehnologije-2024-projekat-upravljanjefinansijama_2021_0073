import FXConverter from "../components/FXConverter";
import CryptoPricesPanel from "../components/CryptoPricesPanel";
import ExportsPanel from "../components/ExportsPanel";

export default function Tools() {
  return (
    <div className="tools-container">
      <h1 className="page-title">Tools</h1>
      <p className="muted" style={{ textAlign:"center", marginTop:-18, marginBottom:24 }}>
        FX konverzija, kripto cene, eksport CSV/PDF.
      </p>

      <div className="tools-grid">
        <FXConverter />
        <CryptoPricesPanel />
        <ExportsPanel />
      </div>
    </div>
  );
}
