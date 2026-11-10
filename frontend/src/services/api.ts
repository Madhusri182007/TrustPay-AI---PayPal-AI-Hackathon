import axios from 'axios'

const defaultApiBase = import.meta.env.PROD
  ? 'https://trustpay-ai-backend.onrender.com'
  : 'http://localhost:8000'
const configuredApiBase = (import.meta.env.VITE_API_BASE_URL ?? defaultApiBase).replace(/\/+$/, '')
const configuredHostname = new URL(configuredApiBase, window.location.origin).hostname
const isLocalApiBase = ['localhost', '127.0.0.1', '[::1]'].includes(configuredHostname)
const apiBase = import.meta.env.PROD && isLocalApiBase ? defaultApiBase : configuredApiBase

if (import.meta.env.PROD && isLocalApiBase) {
  console.warn('Ignoring the localhost VITE_API_BASE_URL in production; using the deployed backend URL instead.')
}

export const api = axios.create({
  baseURL: apiBase.endsWith('/api') ? apiBase : `${apiBase}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('trustpay-access-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
