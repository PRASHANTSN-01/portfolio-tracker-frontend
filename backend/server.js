import express from "express";
import cors from "cors";
import { holdings, calculateAllocation, calculateSummary, calculateHoldingMetrics } from "./portfolioData.js";

const app = express();
app.use(cors());

// Portfolio Holdings with calculated metrics
app.get("/api/portfolio/holdings", (req, res) => {
  try {
    const holdingsWithMetrics = holdings.map(h => {
      const metrics = calculateHoldingMetrics(h);
      return { ...h, ...metrics };
    });
    res.json(holdingsWithMetrics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// Portfolio Allocation calculated dynamically
app.get("/api/portfolio/allocation", (req, res) => {
  try {
    const allocation = calculateAllocation(holdings);
    res.json(allocation);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch allocation" });
  }
});

// Performance Comparison - static for now, can be enhanced later
app.get("/api/portfolio/performance", (req, res) => {
  try {
    // Placeholder static data, can be replaced with dynamic calculations
    const performance = {
      timeline: [
        { date: "2024-01-01", portfolio: 650000, nifty50: 21000, gold: 62000 },
        { date: "2024-03-01", portfolio: 680000, nifty50: 22100, gold: 64500 },
        { date: "2024-06-01", portfolio: 700000, nifty50: 23500, gold: 68000 }
      ],
      returns: {
        portfolio: { "1month": 2.3, "3months": 8.1, "1year": 15.7 },
        nifty50: { "1month": 1.8, "3months": 6.2, "1year": 12.4 },
        gold: { "1month": -0.5, "3months": 4.1, "1year": 8.9 }
      }
    };
    res.json(performance);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch performance" });
  }
});

// Portfolio Summary calculated dynamically
app.get("/api/portfolio/summary", (req, res) => {
  try {
    const summary = calculateSummary(holdings);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

// Error handling for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
