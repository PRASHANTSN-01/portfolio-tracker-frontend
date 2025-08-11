import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PerformanceChart = () => {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    axios.get('/api/portfolio/performance')
      .then(res => setPerformanceData(res.data))
      .catch(console.error);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (!performanceData) return <p>Loading performance data...</p>;

  return (
    <div className="performance-chart">
      <h2>Performance Comparison</h2>
      
      <div className="chart-container">
        <div className="performance-metrics">
          <div className="metric-card">
            <h3>Portfolio</h3>
            <p className="return-value">+{performanceData.returns.portfolio["1year"]}%</p>
            <p className="return-period">1 Year</p>
          </div>
          <div className="metric-card">
            <h3>Nifty 50</h3>
            <p className="return-value">+{performanceData.returns.nifty50["1year"]}%</p>
            <p className="return-period">1 Year</p>
          </div>
          <div className="metric-card">
            <h3>Gold</h3>
            <p className="return-value">+{performanceData.returns.gold["1year"]}%</p>
            <p className="return-period">1 Year</p>
          </div>
        </div>

        <div className="timeline-data">
          <h3>Historical Performance</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Portfolio</th>
                <th>Nifty 50</th>
                <th>Gold</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.timeline.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{formatCurrency(item.portfolio)}</td>
                  <td>{formatCurrency(item.nifty50)}</td>
                  <td>{formatCurrency(item.gold)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
