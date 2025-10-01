import axios from 'axios';

// Configuração base do Axios para chamadas da API
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests (sem autenticação por enquanto)
api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Tratamento global de erros
    console.error('Erro na API:', error.response?.data || error.message);

    return Promise.reject(error);
  }
);

export default api;
