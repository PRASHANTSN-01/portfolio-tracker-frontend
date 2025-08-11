import axios from "axios";

// ✅ Get base URL from env or fallback
let API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// ✅ Remove trailing slash if it exists
API = API.replace(/\/+$/, "");

const handleError = (error) => {
  console.error("API call error:", error);
  throw error;
};

export const fetchHoldings = () =>
  axios.get(`${API}/api/portfolio/holdings`).catch(handleError);

export const fetchAllocation = () =>
  axios.get(`${API}/api/portfolio/allocation`).catch(handleError);

export const fetchPerformance = () =>
  axios.get(`${API}/api/portfolio/performance`).catch(handleError);

export const fetchSummary = () =>
  axios.get(`${API}/api/portfolio/summary`).catch(handleError);
