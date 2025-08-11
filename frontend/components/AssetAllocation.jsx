import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#CD6155'];

const AssetAllocation = () => {
  const [allocation, setAllocation] = useState(null);

  useEffect(() => {
    axios.get("/api/portfolio/allocation")
      .then(res => setAllocation(res.data))
      .catch(console.error);
  }, []);

  if (!allocation) return <p>Loading asset allocation...</p>;

  // Prepare data for sector distribution pie chart
  const sectorData = Object.entries(allocation.bySector || {}).map(([sector, data]) => ({
    name: sector,
    value: Number(data.value || 0),
    percentage: data.percentage
  }));

  return (
    <div className="asset-allocation">
      <h2>Asset Allocation</h2>
      <div className="charts-container">
        <div className="chart-section">
          <h3>Sector Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section">
          <h3>Market Cap Distribution</h3>
          <MarketCapDistribution data={allocation.byMarketCap} />
        </div>
      </div>
    </div>
  );
};

const MarketCapDistribution = ({ data }) => {
  if (!data) return <p>Loading market cap distribution...</p>;

  let marketCapData = Object.entries(data).map(([cap, value]) => ({
    name: cap,
    value: Number(value || 0)
  }));

  // Check if all values are zero
  const allZero = marketCapData.every(item => item.value === 0);

  // If all zero, show single full-color slice
  if (allZero) {
    marketCapData = [
      { name: "No Data", value: 1 }
    ];
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={marketCapData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#82ca9d"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
        >
          {marketCapData.map((entry, index) => (
            <Cell
              key={`cell-mc-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) =>
            `${((value / marketCapData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(2)}%`
          }
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AssetAllocation;
