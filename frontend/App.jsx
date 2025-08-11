import React from "react";
import OverviewCards from "./components/OverviewCards";
import AssetAllocation from "./components/AssetAllocation";
import HoldingsTable from "./components/HoldingsTable";
import PerformanceChart from "./components/PerformanceChart";
import TopPerformers from "./components/TopPerformers";

function App() {
  return (
    <div className="portfolio-dashboard">
      <header>
        <h1>WealthManager Portfolio Dashboard</h1>
      </header>
      
      <main>
        <section className="overview-section">
          <OverviewCards />
        </section>
        
        <section className="allocation-section">
          <AssetAllocation />
        </section>
        
        <section className="holdings-section">
          <HoldingsTable />
        </section>
        
        <section className="performance-section">
          <PerformanceChart />
        </section>
        
        <section className="insights-section">
          <TopPerformers />
        </section>
      </main>
    </div>
  );
}

export default App;
