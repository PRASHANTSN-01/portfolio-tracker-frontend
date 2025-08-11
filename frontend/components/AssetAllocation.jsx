import React, { useEffect, useState } from "react";
import axios from "axios";

const AssetAllocation = () => {
  const [allocation, setAllocation] = useState(null);

  useEffect(() => {
    axios.get("/api/portfolio/allocation")
      .then(res => setAllocation(res.data))
      .catch(console.error);
  }, []);

  if (!allocation) return <p>Loading asset allocation...</p>;

  return (
    <div>
      <h2>Asset Allocation</h2>
      <ul>
        {Object.entries(allocation.bySector).map(([sector, data]) => (
          <li key={sector}>
            <strong>{sector}:</strong> {data.value} ({data.percentage}%)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetAllocation;
