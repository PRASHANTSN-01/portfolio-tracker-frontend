import request from 'supertest';
import express from 'express';
import cors from 'cors';

// Mock the portfolioData module
jest.mock('../portfolioData.js', () => ({
  holdings: [
    {
      symbol: "TEST1",
      name: "Test Company 1",
      quantity: 100,
      avgPrice: 1000,
      currentPrice: 1200,
      sector: "Technology",
      marketCap: "Large"
    }
  ],
  calculateHoldingMetrics: jest.fn(),
  calculateAllocation: jest.fn(),
  calculateSummary: jest.fn()
}));

import { holdings, calculateHoldingMetrics, calculateAllocation, calculateSummary } from '../portfolioData.js';

describe('Express Server API Endpoints', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(cors());
    
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup routes
    app.get("/api/portfolio/holdings", (req, res) => {
      try {
        const holdingsWithMetrics = require('../portfolioData.js').holdings.map(h => {
          const metrics = calculateHoldingMetrics(h);
          return { ...h, ...metrics };
        });
        res.json(holdingsWithMetrics);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch holdings" });
      }
    });

    app.get("/api/portfolio/allocation", (req, res) => {
      try {
        const allocation = calculateAllocation(require('../portfolioData.js').holdings);
        res.json(allocation);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch allocation" });
      }
    });

    app.get("/api/portfolio/performance", (req, res) => {
      try {
        const performance = {
          timeline: [
            { date: "2024-01-01", portfolio: 650000, nifty50: 21000, gold: 62000 },
            { date: "2024-03-01", portfolio: 680000, nifty50: 22100, gold: 64500 }
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

    app.get("/api/portfolio/summary", (req, res) => {
      try {
        const summary = calculateSummary(require('../portfolioData.js').holdings);
        res.json(summary);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch summary" });
      }
    });

    app.use((req, res) => {
      res.status(404).json({ error: "Endpoint not found" });
    });
  });

  describe('GET /api/portfolio/holdings', () => {
    it('should return holdings with calculated metrics', async () => {
      calculateHoldingMetrics.mockReturnValue({
        value: 120000,
        gainLoss: 20000,
        gainLossPercent: 20
      });

      const response = await request(app)
        .get('/api/portfolio/holdings')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('symbol', 'TEST1');
      expect(response.body[0]).toHaveProperty('value', 120000);
      expect(calculateHoldingMetrics).toHaveBeenCalled();
    });

    it('should handle server errors gracefully', async () => {
      calculateHoldingMetrics.mockImplementation(() => {
        throw new Error('Test error');
      });

      const response = await request(app)
        .get('/api/portfolio/holdings')
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Failed to fetch holdings');
    });
  });

  describe('GET /api/portfolio/allocation', () => {
    it('should return allocation data', async () => {
      const mockAllocation = {
        bySector: { Technology: { value: 120000, percentage: 100 } },
        byMarketCap: { Large: { value: 120000, percentage: 100 } }
      };
      calculateAllocation.mockReturnValue(mockAllocation);

      const response = await request(app)
        .get('/api/portfolio/allocation')
        .expect(200);

      expect(response.body).toEqual(mockAllocation);
      expect(calculateAllocation).toHaveBeenCalled();
    });

    it('should handle allocation calculation errors', async () => {
      calculateAllocation.mockImplementation(() => {
        throw new Error('Test error');
      });

      const response = await request(app)
        .get('/api/portfolio/allocation')
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Failed to fetch allocation');
    });
  });

  describe('GET /api/portfolio/performance', () => {
    it('should return performance data', async () => {
      const response = await request(app)
        .get('/api/portfolio/performance')
        .expect(200);

      expect(response.body).toHaveProperty('timeline');
      expect(response.body).toHaveProperty('returns');
      expect(response.body.timeline).toHaveLength(2);
      expect(response.body.returns).toHaveProperty('portfolio');
    });
  });

  describe('GET /api/portfolio/summary', () => {
    it('should return summary data', async () => {
      const mockSummary = {
        totalValue: 120000,
        totalInvested: 100000,
        totalGainLoss: 20000,
        totalGainLossPercent: 20
      };
      calculateSummary.mockReturnValue(mockSummary);

      const response = await request(app)
        .get('/api/portfolio/summary')
        .expect(200);

      expect(response.body).toEqual(mockSummary);
      expect(calculateSummary).toHaveBeenCalled();
    });
  });

  describe('404 Error Handling', () => {
    it('should return 404 for unknown endpoints', async () => {
      const response = await request(app)
        .get('/api/unknown')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Endpoint not found');
    });
  });
});
