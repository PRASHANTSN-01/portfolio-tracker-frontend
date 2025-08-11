import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HoldingsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('symbol');
  const [sortOrder, setSortOrder] = useState('asc');
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios.get('/api/portfolio/holdings')
      .then(res => setHoldings(res.data))
      .catch(console.error);
  }, []);

  const filteredHoldings = holdings.filter(holding =>
    holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holding.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="holdings-table">
      <h2>Portfolio Holdings</h2>
      
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('symbol')}>Symbol</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('quantity')}>Quantity</th>
            <th onClick={() => handleSort('avgPrice')}>Avg Price</th>
            <th onClick={() => handleSort('currentPrice')}>Current Price</th>
            <th onClick={() => handleSort('value')}>Value</th>
            <th onClick={() => handleSort('gainLoss')}>Gain/Loss</th>
            <th onClick={() => handleSort('gainLossPercent')}>% Change</th>
          </tr>
        </thead>
        <tbody>
          {sortedHoldings.map((holding) => (
            <tr key={holding.symbol}>
              <td>{holding.symbol}</td>
              <td>{holding.name}</td>
              <td>{holding.quantity}</td>
              <td>₹{holding.avgPrice.toFixed(2)}</td>
              <td>₹{holding.currentPrice.toFixed(2)}</td>
              <td>₹{holding.value.toLocaleString()}</td>
              <td className={holding.gainLoss >= 0 ? 'positive' : 'negative'}>
                ₹{holding.gainLoss.toFixed(2)}
              </td>
              <td className={holding.gainLossPercent >= 0 ? 'positive' : 'negative'}>
                {holding.gainLossPercent >= 0 ? '+' : ''}{holding.gainLossPercent}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
