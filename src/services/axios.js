import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use(
  config => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
