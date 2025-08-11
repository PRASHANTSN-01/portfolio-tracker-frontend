import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OverviewCards() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("/api/portfolio/summary")
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return <p>Loading...</p>;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="overview-cards">
      <div className="overview-card">
        <h3>Total Portfolio Value</h3>
        <div className="value">{formatCurrency(data.totalValue)}</div>
        <div className="label">Current Market Value</div>
      </div>

      <div className="overview-card">
        <h3>Total Gain/Loss</h3>
        <div className={`value ${data.totalGainLoss >= 0 ? 'positive' : 'negative'}`}>
          {formatCurrency(data.totalGainLoss)}
        </div>
        <div className="gain-loss-percent">
          {data.totalGainLossPercent >= 0 ? '+' : ''}{data.totalGainLossPercent}%
        </div>
      </div>

      <div className="overview-card">
        <h3>Portfolio Performance</h3>
        <div className={`value ${data.totalGainLossPercent >= 0 ? 'positive' : 'negative'}`}>
          {data.totalGainLossPercent >= 0 ? '+' : ''}{data.totalGainLossPercent}%
        </div>
        <div className="label">Since Investment</div>
      </div>

      <div className="overview-card">
        <h3>Number of Holdings</h3>
        <div className="value">{data.numberOfHoldings || 0}</div>
        <div className="label">Stocks in Portfolio</div>
      </div>
    </div>
  );
}
