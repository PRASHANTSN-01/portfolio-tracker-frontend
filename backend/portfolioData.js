export const holdings = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    quantity: 50,
    avgPrice: 2450.0,
    currentPrice: 2680.5,
    sector: "Energy",
    marketCap: "Large"
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    quantity: 100,
    avgPrice: 1800.0,
    currentPrice: 2010.75,
    sector: "Technology",
    marketCap: "Large"
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    quantity: 75,
    avgPrice: 1650.0,
    currentPrice: 1780.25,
    sector: "Financial Services",
    marketCap: "Large"
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    quantity: 80,
    avgPrice: 3200.0,
    currentPrice: 3450.75,
    sector: "Technology",
    marketCap: "Large"
  },
  {
    symbol: "ITC",
    name: "ITC Limited",
    quantity: 120,
    avgPrice: 420.0,
    currentPrice: 465.50,
    sector: "Consumer Goods",
    marketCap: "Large"
  },
  {
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical Industries",
    quantity: 60,
    avgPrice: 1200.0,
    currentPrice: 1285.30,
    sector: "Healthcare",
    marketCap: "Large"
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro",
    quantity: 40,
    avgPrice: 2800.0,
    currentPrice: 2950.80,
    sector: "Infrastructure",
    marketCap: "Large"
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel",
    quantity: 90,
    avgPrice: 850.0,
    currentPrice: 920.45,
    sector: "Telecom",
    marketCap: "Large"
  }
];

// Helper function to calculate value, gain/loss, and gain/loss percent for each holding
export function calculateHoldingMetrics(holding) {
  const value = holding.quantity * holding.currentPrice;
  const invested = holding.quantity * holding.avgPrice;
  const gainLoss = value - invested;
  const gainLossPercent = invested === 0 ? 0 : (gainLoss / invested) * 100;
  return { value, gainLoss, gainLossPercent };
}

// Export a function to calculate allocation by sector and market cap dynamically
export function calculateAllocation(holdings) {
  const bySector = {};
  const byMarketCap = {};
  let totalValue = 0;

  holdings.forEach(h => {
    const { value } = calculateHoldingMetrics(h);
    totalValue += value;

    // Sector allocation
    if (!bySector[h.sector]) {
      bySector[h.sector] = { value: 0 };
    }
    bySector[h.sector].value += value;

    // Market cap allocation
    if (!byMarketCap[h.marketCap]) {
      byMarketCap[h.marketCap] = { value: 0 };
    }
    byMarketCap[h.marketCap].value += value;
  });

  // Calculate percentages
  Object.keys(bySector).forEach(sector => {
    bySector[sector].percentage = totalValue === 0 ? 0 : (bySector[sector].value / totalValue) * 100;
  });
  Object.keys(byMarketCap).forEach(marketCap => {
    byMarketCap[marketCap].percentage = totalValue === 0 ? 0 : (byMarketCap[marketCap].value / totalValue) * 100;
  });

  return { bySector, byMarketCap };
}

// Export a function to calculate summary metrics dynamically
export function calculateSummary(holdings) {
  let totalValue = 0;
  let totalInvested = 0;
  let topPerformer = null;
  let worstPerformer = null;

  holdings.forEach(h => {
    const { value, gainLoss, gainLossPercent } = calculateHoldingMetrics(h);
    const invested = h.quantity * h.avgPrice;
    totalValue += value;
    totalInvested += invested;

    if (!topPerformer || gainLossPercent > topPerformer.gainPercent) {
      topPerformer = { symbol: h.symbol, name: h.name, gainPercent: gainLossPercent };
    }
    if (!worstPerformer || gainLossPercent < worstPerformer.gainPercent) {
      worstPerformer = { symbol: h.symbol, name: h.name, gainPercent: gainLossPercent };
    }
  });

  const totalGainLoss = totalValue - totalInvested;
  const totalGainLossPercent = totalInvested === 0 ? 0 : (totalGainLoss / totalInvested) * 100;

  // Placeholder values for diversificationScore and riskLevel
  const diversificationScore = 8.2;
  const riskLevel = "Moderate";

  return {
    totalValue,
    totalInvested,
    totalGainLoss,
    totalGainLossPercent,
    topPerformer,
    worstPerformer,
    diversificationScore,
    riskLevel
  };
}
