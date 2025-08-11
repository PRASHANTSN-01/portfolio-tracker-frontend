import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  // Prepare data for line chart timeline
  const timelineData = performanceData.timeline.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    Portfolio: item.portfolio,
    'Nifty 50': item.nifty50,
    Gold: item.gold
  }));

  return (
    <div className="performance-chart">
      <h2>Performance Comparison</h2>
      
      <div className="performance-metrics">
        <div className="metric-card portfolio-1month">
          <h3>Portfolio</h3>
          <p className="return-value">+{performanceData.returns.portfolio["1month"]}%</p>
          <p className="return-period">1 Month</p>
        </div>
        <div className="metric-card portfolio-3months">
          <h3>Portfolio</h3>
          <p className="return-value">+{performanceData.returns.portfolio["3months"]}%</p>
          <p className="return-period">3 Months</p>
        </div>
        <div className="metric-card portfolio-1year">
          <h3>Portfolio</h3>
          <p className="return-value">+{performanceData.returns.portfolio["1year"]}%</p>
          <p className="return-period">1 Year</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <Line type="monotone" dataKey="Portfolio" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Nifty 50" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Gold" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
