import express from "express";
import cors from "cors";
import { holdings, calculateAllocation, calculateSummary, calculateHoldingMetrics } from "./portfolioData.js";

const app = express();
app.use(cors());

// Portfolio Holdings endpoint
app.get("/api/portfolio/holdings", (req, res) => {
  try {
    const holdingsWithMetrics = holdings.map(h => {
      const metrics = calculateHoldingMetrics(h);
      return { ...h, ...metrics };
    });
    res.json(holdingsWithMetrics);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// Add other API endpoints here...

// Use Render's port in production
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
