import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import HoldingsTable from '../HoldingsTable';

vi.mock('axios');

describe('HoldingsTable Component', () => {
  const mockHoldings = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      quantity: 50,
      avgPrice: 2450.0,
      currentPrice: 2680.5,
      sector: "Energy",
      marketCap: "Large",
      value: 134025,
      gainLoss: 11525,
      gainLossPercent: 9.41
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      quantity: 100,
      avgPrice: 1800.0,
      currentPrice: 2010.75,
      sector: "Technology",
      marketCap: "Large",
      value: 201075,
      gainLoss: 21075,
      gainLossPercent: 11.71
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockHoldings });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    render(<HoldingsTable />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render holdings table with data', async () => {
    render(<HoldingsTable />);
    
    await waitFor(() => {
      expect(screen.getByText('RELIANCE')).toBeInTheDocument();
      expect(screen.getByText('Reliance Industries Ltd')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('₹2,450.00')).toBeInTheDocument();
      expect(screen.getByText('₹2,680.50')).toBeInTheDocument();
      expect(screen.getByText('₹1,34,025')).toBeInTheDocument();
      expect(screen.getByText('₹11,525')).toBeInTheDocument();
      expect(screen.getByText('9.41%')).toBeInTheDocument();
    });
  });

  it('should render sector badges', async () => {
    render(<HoldingsTable />);
    
    await waitFor(() => {
      expect(screen.getByText('Energy')).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
    });
  });

  it('should handle empty holdings array', async () => {
    axios.get.mockResolvedValue({ data: [] });
    
    render(<HoldingsTable />);
    
    await waitFor(() => {
      expect(screen.queryByText('RELIANCE')).not.toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    
    render(<HoldingsTable />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
});
