import axios from 'axios'
import { API_CONFIG } from './constants/api'

const api = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Interceptor para requisições
api.interceptors.request.use(
    (config) => {
        // Adicionar token de autenticação se necessário
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Interceptor para respostas
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // Tratar erros globais
        if (error.response?.status === 401) {
            // Redirecionar para login ou limpar token
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export { api }
