import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('user');
  },

  // Get current authenticated user
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const user = localStorage.getItem('user');
    return !!user;
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const user = authService.getCurrentUser();
      if (user?.refreshToken) {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refreshToken: user.refreshToken
        });
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify({
            ...user,
            token: response.data.token
          }));
        }
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
};

// Add axios interceptor for authentication
axios.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user?.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);