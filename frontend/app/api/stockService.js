import axios from 'axios';
import API_BASE_URL from '../config';

export const stockApi = {
  createStock: (stockData) => axios.post(`${API_BASE_URL}/stocks`, stockData),
  getAllStocks: () => axios.get(`${API_BASE_URL}/stocks`),
  updateStock: (id, stockData) => axios.put(`${API_BASE_URL}/stocks/${id}`, stockData),
  deleteStock: (id) => axios.delete(`${API_BASE_URL}/stocks/${id}`)
};