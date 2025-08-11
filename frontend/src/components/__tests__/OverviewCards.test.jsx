import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import OverviewCards from '../OverviewCards';

// Mock axios
vi.mock('axios');

describe('OverviewCards Component', () => {
  const mockData = {
    totalValue: 120000,
    totalInvested: 100000,
    totalGainLoss: 20000,
    totalGainLossPercent: 20,
    numberOfHoldings: 2
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    render(<OverviewCards />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render portfolio data after loading', async () => {
    render(<OverviewCards />);
    
    await waitFor(() => {
      expect(screen.getByText('₹1,20,000')).toBeInTheDocument();
      expect(screen.getByText('₹20,000')).toBeInTheDocument();
      expect(screen.getByText('+20%')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    
    render(<OverviewCards />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('should format currency correctly', async () => {
    render(<OverviewCards />);
    
    await waitFor(() => {
      expect(screen.getByText('₹1,20,000')).toBeInTheDocument();
    });
  });

  it('should apply positive class for gains', async () => {
    render(<OverviewCards />);
    
    await waitFor(() => {
      const gainElement = screen.getByText('₹20,000');
      expect(gainElement).toHaveClass('positive');
    });
  });

  it('should apply negative class for losses', async () => {
    axios.get.mockResolvedValue({
      data: {
        ...mockData,
        totalGainLoss: -20000,
        totalGainLossPercent: -20
      }
    });
    
    render(<OverviewCards />);
    
    await waitFor(() => {
      const lossElement = screen.getByText('-₹20,000');
      expect(lossElement).toHaveClass('negative');
    });
  });
});
