// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://smart-lead-backend-2.onrender.com';

export const getApiUrl = (endpoint) => {
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  if (API_BASE_URL) {
    // Ensure API_BASE_URL doesn't end with a slash
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    return `${baseUrl}/${cleanEndpoint}`;
  }
  
  // Fallback to relative URL (works with Vite proxy in dev)
  return `/${cleanEndpoint}`;
};

