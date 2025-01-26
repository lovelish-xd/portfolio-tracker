import axios from 'axios';
import API_BASE_URL from '../config';

// Register a new user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
  return response.data;
};
