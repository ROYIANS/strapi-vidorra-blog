import axios from 'axios'
import { getCookie } from '@/lib/cookies'

const ACCESS_TOKEN = 'thisisjustarandomstring'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const cookieState = getCookie(ACCESS_TOKEN)
    const token = cookieState ? JSON.parse(cookieState) : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      window.location.href = '/sign-in'
    }
    return Promise.reject(error)
  }
)
