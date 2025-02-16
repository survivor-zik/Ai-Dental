import axios from 'axios';
import { API_BASE_URL } from './config';

export const apiKeysAPI = {
  getAllKeys: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api-keys`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  createKey: async (name) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api-keys`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  deleteKey: async (keyId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api-keys/${keyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};