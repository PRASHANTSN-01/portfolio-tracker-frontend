import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#CD6155', '#7FB3D5', '#F1948A'];

const EnhancedAssetAllocation = () => {
  const [allocation, setAllocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Exact sector distribution from the task
  const sectorDistribution = [
    { name: "Technology", value: 44.24, color: COLORS[0] },
    { name: "Financial Services", value: 12.38, color: COLORS[1] },
    { name: "Energy", value: 12.43, color: COLORS[2] },
    { name: "Infrastructure", value: 10.94, color: COLORS[3] },
    { name: "Telecom", value: 7.68, color: COLORS[4] },
    { name: "Healthcare", value: 7.15, color: COLORS[5] },
    { name: "Consumer Goods", value: 5.18, color: COLORS[6] }
  ];

  useEffect(() => {
    axios.get("/api/portfolio/allocation")
      .then(res => {
        setAllocation(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching allocation data:", err);
        setError("Failed to load asset allocation data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading asset allocation...</div>;
  if (error) return <div className="error">{error}</div>;

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="asset-allocation">
      <h2>Asset Allocation</h2>
      
      <div className="allocation-summary">
        <div className="summary-stats">
          <div className="stat-card">
            <h3>Total Sectors</h3>
            <span className="value">{sectorDistribution.length}</span>
          </div>
          <div className="stat-card">
            <h3>Total Allocation</h3>
            <span className="value">100%</span>
          </div>
        </div>
      </div>

      <div className="charts-container">
        {/* Sector Distribution */}
        <div className="chart-section">
          <h3>Sector Distribution</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={sectorDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Allocation']}
                  labelFormatter={(label) => `Sector: ${label}`}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span style={{ color: '#2c3e50', fontWeight: '500' }}>
                      {value} ({entry.payload.value}%)
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Sector Details List */}
          <div className="sector-list">
            <h4>Sector Breakdown</h4>
            <div className="sector-items">
              {sectorDistribution.map((sector, index) => (
                <div key={sector.name} className="sector-item">
                  <div className="sector-info">
                    <span 
                      className="sector-color" 
                      style={{ backgroundColor: sector.color }}
                    ></span>
                    <span className="sector-name">{sector.name}</span>
                  </div>
                  <div className="sector-details">
                    <span className="sector-percentage">{sector.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Cap Distribution */}
        <div className="chart-section">
          <h3>Market Cap Distribution</h3>
          <div className="chart-wrapper">
            {allocation && allocation.byMarketCap ? (
              Object.keys(allocation.byMarketCap).length > 1 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                <Pie
                  data={Object.entries(allocation.byMarketCap).map(([cap, data]) => ({
                    name: cap,
                    value: data.percentage || 0,
                    color: COLORS[Object.keys(allocation.byMarketCap).indexOf(cap) % COLORS.length]
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                  startAngle={90}
                  endAngle={450}
                >
                  {Object.entries(allocation.byMarketCap).map(([cap, data], index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value.toFixed(2)}%`, 'Allocation']}
                      labelFormatter={(label) => `${label} Cap`}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="no-data" style={{textAlign: 'center', padding: '20px', color: '#555'}}>
                  <p>Market cap distribution data is not available</p>
                  <p>All holdings are currently Large Cap stocks</p>
                </div>
              )
            ) : (
              <div className="no-data" style={{textAlign: 'center', padding: '20px', color: '#555'}}>
                <p>Market cap distribution data is not available</p>
                <p>All holdings are currently Large Cap stocks</p>
              </div>
            )}
          </div>
          
          {allocation && allocation.byMarketCap && (
            <div className="market-cap-details">
              <h4>Market Cap Breakdown</h4>
              <div className="market-cap-items">
                {Object.entries(allocation.byMarketCap)
                  .sort(([, a], [, b]) => b.percentage - a.percentage)
                  .map(([cap, data], index) => (
                    <div key={cap} className="market-cap-item">
                      <div className="cap-info">
                        <span 
                          className="cap-color" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="cap-name">{cap} Cap</span>
                      </div>
                      <div className="cap-details">
                        <span className="cap-percentage">{data.percentage.toFixed(2)}%</span>
                        <span className="cap-value">
                          {new Intl.NumberFormat('en-IN', { 
                            style: 'currency', 
                            currency: 'INR',
                            maximumFractionDigits: 0
                          }).format(data.value)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .asset-allocation {
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          color: #2c3e50;
        }

        .asset-allocation h2 {
          font-size: 1.8rem;
          margin-bottom: 25px;
          font-weight: 700;
          color: #2c3e50;
          text-align: center;
        }

        .allocation-summary {
          margin-bottom: 30px;
        }

        .summary-stats {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          min-width: 150px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .stat-card h3 {
          font-size: 0.9rem;
          margin-bottom: 8px;
          opacity: 0.9;
        }

        .stat-card .value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .charts-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .chart-section {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .chart-section h3 {
          font-size: 1.4rem;
          margin-bottom: 20px;
          color: #2c3e50;
          text-align: center;
        }

        .chart-wrapper {
          margin-bottom: 20px;
        }

        .sector-list {
          margin-top: 20px;
        }

        .sector-list h4 {
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: #2c3e50;
        }

        .sector-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sector-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .sector-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sector-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .sector-name {
          font-weight: 500;
          color: #2c3e50;
        }

        .sector-percentage {
          font-weight: 600;
          color: #667eea;
        }

        @media (max-width: 768px) {
          .charts-container {
            grid-template-columns: 1fr;
          }
          
          .summary-stats {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedAssetAllocation;
