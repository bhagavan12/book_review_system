// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3004', // Backend URL
});

export default api;
  