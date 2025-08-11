import { holdings, calculateHoldingMetrics, calculateAllocation, calculateSummary } from '../portfolioData.js';

describe('Portfolio Data Utilities', () => {
  describe('calculateHoldingMetrics', () => {
    it('should calculate correct metrics for a holding', () => {
      const holding = {
        quantity: 100,
        avgPrice: 1000,
        currentPrice: 1200
      };
      
      const result = calculateHoldingMetrics(holding);
      
      expect(result.value).toBe(120000);
      expect(result.gainLoss).toBe(20000);
      expect(result.gainLossPercent).toBe(20);
    });

    it('should handle zero investment', () => {
      const holding = {
        quantity: 0,
        avgPrice: 1000,
        currentPrice: 1200
      };
      
      const result = calculateHoldingMetrics(holding);
      
      expect(result.value).toBe(0);
      expect(result.gainLoss).toBe(0);
      expect(result.gainLossPercent).toBe(0);
    });

    it('should handle negative gain/loss', () => {
      const holding = {
        quantity: 100,
        avgPrice: 1000,
        currentPrice: 800
      };
      
      const result = calculateHoldingMetrics(holding);
      
      expect(result.value).toBe(80000);
      expect(result.gainLoss).toBe(-20000);
      expect(result.gainLossPercent).toBe(-20);
    });
  });

  describe('calculateAllocation', () => {
    it('should calculate allocation by sector and market cap', () => {
      const testHoldings = [
        {
          symbol: "TEST1",
          quantity: 100,
          avgPrice: 1000,
          currentPrice: 1200,
          sector: "Technology",
          marketCap: "Large"
        },
        {
          symbol: "TEST2",
          quantity: 50,
          avgPrice: 2000,
          currentPrice: 2200,
          sector: "Energy",
          marketCap: "Mid"
        }
      ];

      const result = calculateAllocation(testHoldings);
      
      expect(result.bySector.Technology.value).toBe(120000);
      expect(result.bySector.Energy.value).toBe(110000);
      expect(result.byMarketCap.Large.value).toBe(120000);
      expect(result.byMarketCap.Mid.value).toBe(110000);
      
      expect(result.bySector.Technology.percentage).toBeCloseTo(52.17);
      expect(result.bySector.Energy.percentage).toBeCloseTo(47.83);
    });

    it('should handle empty holdings array', () => {
      const result = calculateAllocation([]);
      
      expect(result.bySector).toEqual({});
      expect(result.byMarketCap).toEqual({});
    });
  });

  describe('calculateSummary', () => {
    it('should calculate portfolio summary correctly', () => {
      const testHoldings = [
        {
          symbol: "TEST1",
          name: "Test Company 1",
          quantity: 100,
          avgPrice: 1000,
          currentPrice: 1200,
          sector: "Technology",
          marketCap: "Large"
        },
        {
          symbol: "TEST2",
          name: "Test Company 2",
          quantity: 50,
          avgPrice: 2000,
          currentPrice: 1800,
          sector: "Energy",
          marketCap: "Mid"
        }
      ];

      const result = calculateSummary(testHoldings);
      
      expect(result.totalValue).toBe(210000);
      expect(result.totalInvested).toBe(200000);
      expect(result.totalGainLoss).toBe(10000);
      expect(result.totalGainLossPercent).toBe(5);
      expect(result.topPerformer.symbol).toBe("TEST1");
      expect(result.worstPerformer.symbol).toBe("TEST2");
    });
  });
});
