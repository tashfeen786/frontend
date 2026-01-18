import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch predictions
export const fetchPredictions = async (tokenAddress) => {
  try {
    const response = await api.post('/api/predict', {
      token_address: tokenAddress,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Fetch history
export const fetchHistory = async (tokenAddress, limit = 24) => {
  try {
    const response = await api.get(`/api/history/${tokenAddress}`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('History API Error:', error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default api;