import axios from 'axios'

const defaultApiBase = import.meta.env.PROD
  ? 'https://trustpay-ai-backend.onrender.com'
  : 'http://localhost:8000'
const configuredApiBase = (import.meta.env.VITE_API_BASE_URL ?? defaultApiBase).replace(/\/+$/, '')

export const api = axios.create({
  baseURL: configuredApiBase.endsWith('/api') ? configuredApiBase : `${configuredApiBase}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('trustpay-access-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
