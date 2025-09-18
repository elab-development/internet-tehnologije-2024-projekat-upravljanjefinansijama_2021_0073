import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import "../components/Shared.css"; 

export default function Analytics() {
  const [dataMonth, setDataMonth] = useState([["Mesec","Prihod","Rashod","Neto"]]);
  const [dataCat, setDataCat] = useState([["Kategorija","Iznos"]]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios.get("/reports/summary", {
      params: { from: null, to: null }, 
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const byMonth = res.data.by_month || [];
        const byCat = res.data.by_category || [];
        setDataMonth([
          ["Mesec","Prihod","Rashod","Neto"],
          ...byMonth.map(m => [m.month, m.income, m.expense, m.net])
        ]);
        setDataCat([
          ["Kategorija","Iznos"],
          ...byCat.map(c => [c.category, c.sum])
        ]);
      });
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">📊 Analytics</h2>

      <div className="content-card" style={{ marginBottom: "40px" }}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Prihodi vs Rashodi (mesečno)
        </h3>
        <Chart
          chartType="LineChart"
          width="100%"
          height="360px"
          data={dataMonth}
          options={{
            curveType: "function",
            legend: { position: "bottom" },
            colors: ["#27ae60", "#e74c3c", "#2980b9"],
          }}
        />
      </div>

      <div className="content-card">
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Top kategorije rashoda
        </h3>
        <Chart
          chartType="PieChart"
          width="100%"
          height="360px"
          data={dataCat}
          options={{
            pieHole: 0.4,
            legend: { position: "right" },
            colors: ["#e74c3c", "#f39c12", "#8e44ad", "#3498db", "#2ecc71"],
          }}
        />
      </div>
    </div>
  );
}
