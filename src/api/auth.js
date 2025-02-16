import axios from 'axios';
import { API_BASE_URL } from './config';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
        return { 
          success: true, 
          token 
        };
      }
      throw new Error('No token received');
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  },

  verifyToken: async (token) => {
    try {
      const response = await api.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { valid: true, user: response.data };
    } catch (error) {
      return { valid: false };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    return { success: true };
  }
};