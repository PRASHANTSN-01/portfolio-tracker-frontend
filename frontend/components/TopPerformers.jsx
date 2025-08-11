import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopPerformers = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get('/api/portfolio/summary')
      .then(res => setSummary(res.data))
      .catch(console.error);
  }, []);

  if (!summary) return <p>Loading portfolio insights...</p>;

  return (
    <div className="top-performers">
      <h2>Portfolio Insights</h2>
      
      <div className="insights-grid">
        <div className="insight-card">
          <h3>Top Performer</h3>
          <div className="performer-info">
            <span className="symbol">{summary.topPerformer.symbol}</span>
            <span className="name">{summary.topPerformer.name}</span>
            <span className="performance positive">+{summary.topPerformer.gainPercent}%</span>
          </div>
        </div>

        <div className="insight-card">
          <h3>Worst Performer</h3>
          <div className="performer-info">
            <span className="symbol">{summary.worstPerformer.symbol}</span>
            <span className="name">{summary.worstPerformer.name}</span>
            <span className="performance negative">{summary.worstPerformer.gainPercent}%</span>
          </div>
        </div>

        <div className="insight-card">
          <h3>Diversification Score</h3>
          <div className="score-display">
            <span className="score">{summary.diversificationScore}/10</span>
            <span className="label">Portfolio Diversity</span>
          </div>
        </div>

        <div className="insight-card">
          <h3>Risk Level</h3>
          <div className="risk-display">
            <span className={`risk ${summary.riskLevel.toLowerCase()}`}>
              {summary.riskLevel}
            </span>
          </div>
        </div>
      </div>

      <div className="portfolio-summary">
        <h3>Portfolio Summary</h3>
        <div className="summary-stats">
          <div className="stat">
            <span className="label">Total Value</span>
            <span className="value">₹{summary.totalValue.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">Total Invested</span>
            <span className="value">₹{summary.totalInvested.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">Total Gain/Loss</span>
            <span className={`value ${summary.totalGainLoss >= 0 ? 'positive' : 'negative'}`}>
              ₹{summary.totalGainLoss.toLocaleString()} ({summary.totalGainLossPercent}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
