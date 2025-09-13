// Application constants
export const APP_NAME = 'My App'
export const APP_VERSION = '1.0.0'

// API endpoints
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api'

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const

// Navigation items
export const NAV_ITEMS = [
  { path: ROUTES.HOME, label: 'Inicio' },
  { path: ROUTES.ABOUT, label: 'Acerca de' },
  { path: ROUTES.CONTACT, label: 'Contacto' },
] as const

// Theme colors
export const COLORS = {
  primary: '#3B82F6',
  secondary: '#6B7280',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
} as const

// Local storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const 