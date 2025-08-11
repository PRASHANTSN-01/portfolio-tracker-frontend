# Comprehensive Testing Guide - WealthManager Portfolio Application

## Overview
This guide provides complete instructions for setting up and running thorough tests for the WealthManager portfolio application, including both frontend and backend testing.

## Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Run All Tests

**Backend Tests:**
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage report
```

**Frontend Tests:**
```bash
cd frontend
npm test                   # Run all tests
npm run test:ui           # Interactive UI mode
npm run test:coverage     # With coverage report
```

## Test Structure

### Backend Tests (`backend/tests/`)
- **portfolioData.test.js**: Unit tests for utility functions
- **server.test.js**: Integration tests for API endpoints

### Frontend Tests (`frontend/src/components/__tests__/`)
- **OverviewCards.test.jsx**: Component tests for overview cards
- **HoldingsTable.test.jsx**: Component tests for holdings table
- **AssetAllocation.test.jsx**: Component tests for asset allocation
- **PerformanceChart.test.jsx**: Component tests for performance chart
- **TopPerformers.test.jsx**: Component tests for top performers

## Test Categories

### 1. Unit Tests
- **Backend**: Test individual utility functions
- **Frontend**: Test individual React components

### 2. Integration Tests
- **Backend**: Test API endpoints with mocked data
- **Frontend**: Test component interactions

### 3. End-to-End Tests
- **Frontend**: Test complete user workflows (using Playwright)

### 4. API Contract Tests
- **Cross-platform**: Ensure frontend and backend contracts match

## Detailed Test Commands

### Backend Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test -- portfolioData.test.js

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with verbose output
npm test -- --verbose
```

### Frontend Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test -- OverviewCards.test.jsx

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests in debug mode
npm test -- --debug
```

## Test Coverage Reports

### Backend Coverage
After running `npm run test:coverage`, check:
- `backend/coverage/lcov-report/index.html` (open in browser)

### Frontend Coverage
After running `npm run test:coverage`, check:
- `frontend/coverage/index.html` (open in browser)

## Writing New Tests

### Backend Test Example
```javascript
// backend/tests/newFeature.test.js
import { newFeature } from '../newFeature.js';

describe('New Feature', () => {
  it('should do something', () => {
    const result = newFeature(input);
    expect(result).toBe(expected);
  });
});
```

### Frontend Test Example
```javascript
// frontend/src/components/__tests__/NewComponent.test.jsx
import { render, screen } from '@testing-library/react';
import NewComponent from '../NewComponent';

describe('NewComponent', () => {
  it('should render correctly', () => {
    render(<NewComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Mocking Strategies

### Backend Mocking
- Use Jest mocks for external dependencies
- Mock database calls with test data
- Mock API responses for integration tests

### Frontend Mocking
- Mock axios calls with test data
- Mock React Router for component tests
- Mock global objects (window, ResizeObserver)

## Performance Testing

### Load Testing
```bash
# Install artillery for load testing
npm install -g artillery

# Run load test
artillery run load-test.yml
```

### Performance Monitoring
- Monitor test execution time
- Check memory usage during tests
- Profile component rendering performance

## Continuous Integration

### GitHub Actions Example
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

## Troubleshooting

### Common Issues

1. **Tests failing due to network requests**
   - Ensure axios is properly mocked
   - Check mock data structure matches API response

2. **Component tests failing**
   - Verify all dependencies are mocked
   - Check for async operations

3. **Coverage not working**
   - Ensure test files are in correct directories
   - Check Jest/Vitest configuration

### Debug Mode
```bash
# Backend
npm test -- --debug

# Frontend
npm test -- --debug
```

## Test Data Management

### Test Data Files
- `backend/tests/fixtures/`: Test data for backend tests
- `frontend/src/test/fixtures/`: Test data for frontend tests

### Environment Variables
Create `.env.test` files for test-specific configurations:
```bash
# backend/.env.test
PORT=5001
NODE_ENV=test

# frontend/.env.test
VITE_API_URL=http://localhost:5001
```

## Maintenance

### Regular Updates
- Update test dependencies monthly
- Review and update test cases when features change
- Monitor test execution time

### Test Review Checklist
- [ ] All new features have corresponding tests
- [ ] Tests cover edge cases
- [ ] Tests are independent and don't rely on each other
- [ ] Mock data is realistic
- [ ] Test names are descriptive
- [ ] Coverage meets minimum requirements (80%)

## Support

For questions or issues with testing:
1. Check this guide first
2. Review existing test files for examples
3. Open an issue with test output and error messages
