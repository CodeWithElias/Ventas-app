// User types
export interface User {
  id: string
  username: string
  email: string
  role: "Administrador" | "Vendedor"
  firstName: string
  lastName: string
}

// Product types
export interface Product {
  id: string
  name: string
  category: string
  stock: number
  unit: string
  price: number
  minStock: number
  supplier: string
  description?: string
}

// Purchase types
export interface Purchase {
  id: string
  date: string
  supplier: string
  total: number
  status: "Pendiente" | "Completada" | "Cancelada"
  items: Array<{
    product: string
    quantity: number
    unitCost: number
  }>
}

// Sale types
export interface Sale {
  id: string
  date: string
  customer: string
  total: number
  paymentMethod: "Efectivo" | "Tarjeta" | "Transferencia"
  items: Array<{
    product: string
    quantity: number
    unitPrice: number
  }>
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// Form types
export interface LoginFormData {
  username: string
  password: string
}

export interface ProductFormData {
  name: string
  category: string
  stock: number
  unit: string
  price: number
  minStock: number
  supplier: string
  description?: string
}

// Navigation types
export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  role?: "Administrador" | "Vendedor"
} 