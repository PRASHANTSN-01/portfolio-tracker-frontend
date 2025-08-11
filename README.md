# WealthManager Portfolio Analytics Dashboard

## Full-Stack Developer Intern Assignment
**WealthManager.online - Portfolio Analytics Dashboard**

## 🎯 Assignment Overview

This is a comprehensive portfolio analytics dashboard that provides investors with a complete view of their investment portfolio. The application consists of a robust backend API and an interactive frontend interface.

## 🚀 Features

### Backend API
- **Portfolio Holdings**: Complete list of stock investments with detailed metrics
- **Portfolio Allocation**: Asset distribution by sectors and market cap
- **Performance Comparison**: Historical performance vs benchmarks (Nifty 50, Gold)
- **Portfolio Summary**: Key portfolio metrics and insights

### Frontend Dashboard
- **Portfolio Overview Cards**: Total value, gains/losses, performance metrics
- **Asset Allocation Visualizations**: Sector and market cap distribution
- **Interactive Holdings Table**: Sortable, searchable, filterable
- **Performance Comparison Charts**: Timeline visualization vs benchmarks
- **Top Performers Section**: Best/worst performers with insights

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **CORS** for cross-origin requests
- **RESTful API** design
- **Error handling** and validation

### Frontend
- **React** with functional components
- **Responsive design** for mobile/desktop
- **Interactive charts** and visualizations
- **CSS Grid** and Flexbox for layout

## 📊 API Endpoints

### Portfolio Holdings
```
GET /api/portfolio/holdings
```
Returns complete list of stock investments with:
- Symbol, name, quantity, prices
- Sector, market cap classification
- Value, gains/losses, percentages

### Portfolio Allocation
```
GET /api/portfolio/allocation
```
Returns asset distribution:
- By sector (Technology, Banking, Energy, etc.)
- By market cap (Large, Mid, Small)

### Performance Comparison
```
GET /api/portfolio/performance
```
Returns historical performance vs:
- Portfolio performance
- Nifty 50 benchmark
- Gold performance

### Portfolio Summary
```
GET /api/portfolio/summary
```
Returns key metrics:
- Total value, invested amount
- Overall gains/losses
- Top/worst performers
- Diversification score and risk level

## 🏗️ Project Structure

```
├── backend/
│   ├── server.js              # Express server with API endpoints
│   ├── portfolioData.js       # Sample portfolio data
│   └── package.json           # Backend dependencies
├── frontend/
│   ├── components/            # React components
│   │   ├── OverviewCards.jsx
│   │   ├── AssetAllocation.jsx
│   │   ├── HoldingsTable.jsx
│   │   ├── PerformanceChart.jsx
│   │   └── TopPerformers.jsx
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   ├── styles.css            # Styling
│   └── package.json          # Frontend dependencies
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone [repository-url]
cd portfolio-analytics-dashboard
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install
```

### Running the Application

1. **Start the backend server**
```bash
cd backend
npm start
```

2. **Start the frontend development server**
```bash
cd frontend
npm run dev
```

## 📱 Usage

1. **View Portfolio Overview**: Check total value, gains/losses, and performance metrics
2. **Analyze Allocation**: See sector and market cap distribution
3. **Browse Holdings**: Sort, search, and filter individual stock holdings
4. **Compare Performance**: View historical performance vs benchmarks
5. **Get Insights**: See top performers and portfolio risk assessment

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, sorting, filtering
- **Visual Hierarchy**: Clear information layout
- **Loading States**: Graceful handling of API loading
- **Error Handling**: User-friendly error messages

## 🔧 Development Notes

### AI Tools Used
- **GitHub Copilot**: Assisted with code generation and suggestions
- **ChatGPT**: Helped with component structure and styling
- **AI-generated components**: OverviewCards, HoldingsTable, PerformanceChart

### Key Challenges Solved
- Responsive grid layout for overview cards
- Interactive sorting for holdings table
- Performance comparison visualization
- Error handling for API failures

## 📋 Deliverables

1. **Complete Working Application**
   - Live backend API
   - Interactive frontend dashboard
   - Responsive design

2. **Documentation**
   - Comprehensive README
   - Clean, organized code
   - Component documentation

3. **Working Demo**
   - All features functional
   - Mobile responsiveness
   - Error handling demonstrated

## 🎯 Next Steps

- Deploy to production
- Add real-time data updates
- Implement user authentication
- Add more chart types
- Performance optimization

## 📞 Support

For questions or issues, please contact the development team.
