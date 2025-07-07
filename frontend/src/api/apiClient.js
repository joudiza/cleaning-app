// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://cleaning-app-58pg.onrender.com/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
console.log("🔐 Access Token added to request:", token);
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)
// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if token expired (401) and not already retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Send refresh token request
        const refreshToken = localStorage.getItem('refresh');
      const response = await apiClient.post('/token/refresh/', {
  refresh: refreshToken,
});

        const newAccessToken = response.data.access;

        // Save new token
        localStorage.setItem('access', newAccessToken);

        // Update header and retry original request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        // Logout user or redirect to login
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
