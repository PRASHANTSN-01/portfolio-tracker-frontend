import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const fetchHoldings = () => axios.get(`${API}/holdings`);
export const fetchAllocation = () => axios.get(`${API}/allocation`);
export const fetchPerformance = () => axios.get(`${API}/performance`);
export const fetchSummary = () => axios.get(`${API}/summary`);
