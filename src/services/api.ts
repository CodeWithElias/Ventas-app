import { User, Product, Sale, Purchase, ApiResponse } from "@/types"

// Base API configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:3000/api"

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token")
    
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Auth endpoints
  async login(username: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (username === "admin" && password === "admin") {
      return {
        data: {
          user: {
            id: "1",
            username: "admin",
            email: "admin@example.com",
            role: "Administrador",
            firstName: "Juan",
            lastName: "Pérez",
          },
          token: "fake-jwt-token"
        },
        message: "Login successful",
        success: true
      }
    } else if (username === "vendedor" && password === "vendedor") {
      return {
        data: {
          user: {
            id: "2",
            username: "vendedor",
            email: "vendedor@example.com",
            role: "Vendedor",
            firstName: "María",
            lastName: "García",
          },
          token: "fake-jwt-token"
        },
        message: "Login successful",
        success: true
      }
    }
    
    throw new Error("Credenciales inválidas")
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      data: {
        id: "1",
        username: "admin",
        email: "admin@example.com",
        role: "Administrador",
        firstName: "Juan",
        lastName: "Pérez",
      },
      message: "User retrieved successfully",
      success: true
    }
  }

  // Products endpoints
  async getProducts(): Promise<ApiResponse<Product[]>> {
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Aceitunas Verdes 500g",
        category: "Aceitunas",
        stock: 5,
        unit: "unidades",
        price: 12.5,
        minStock: 20,
        supplier: "Proveedor A",
      },
      {
        id: "2",
        name: "Aceitunas Negras 500g",
        category: "Aceitunas",
        stock: 35,
        unit: "unidades",
        price: 14.0,
        minStock: 20,
        supplier: "Proveedor A",
      },
      {
        id: "3",
        name: "Mermelada de Fresa 250g",
        category: "Conservas",
        stock: 8,
        unit: "unidades",
        price: 8.75,
        minStock: 15,
        supplier: "Proveedor B",
      },
      {
        id: "4",
        name: "Aceite de Oliva Extra Virgen 1L",
        category: "Aceites",
        stock: 12,
        unit: "litros",
        price: 25.0,
        minStock: 25,
        supplier: "Proveedor C",
      },
      {
        id: "5",
        name: "Manzanas Rojas",
        category: "Frutas",
        stock: 50,
        unit: "kg",
        price: 3.5,
        minStock: 30,
        supplier: "Proveedor D",
      },
    ]
    
    return {
      data: mockProducts,
      message: "Products retrieved successfully",
      success: true
    }
  }

  async createProduct(product: Omit<Product, "id">): Promise<ApiResponse<Product>> {
    return this.request<Product>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    })
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    })
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/products/${id}`, {
      method: "DELETE",
    })
  }

  // Sales endpoints
  async getSales(): Promise<ApiResponse<Sale[]>> {
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockSales: Sale[] = [
      {
        id: "1",
        date: "2024-01-15",
        customer: "María González",
        total: 125.50,
        paymentMethod: "Efectivo",
        items: [
          { product: "Aceitunas Verdes 500g", quantity: 2, unitPrice: 12.5 },
          { product: "Mermelada de Fresa 250g", quantity: 3, unitPrice: 8.75 }
        ]
      },
      {
        id: "2",
        date: "2024-01-14",
        customer: "Juan Pérez",
        total: 89.00,
        paymentMethod: "Tarjeta",
        items: [
          { product: "Aceite de Oliva 1L", quantity: 1, unitPrice: 25.0 },
          { product: "Aceitunas Negras 500g", quantity: 4, unitPrice: 14.0 }
        ]
      },
      {
        id: "3",
        date: "2024-01-13",
        customer: "Ana López",
        total: 45.75,
        paymentMethod: "Transferencia",
        items: [
          { product: "Manzanas Rojas", quantity: 5, unitPrice: 3.5 },
          { product: "Mermelada de Fresa 250g", quantity: 2, unitPrice: 8.75 }
        ]
      }
    ]
    
    return {
      data: mockSales,
      message: "Sales retrieved successfully",
      success: true
    }
  }

  async createSale(sale: Omit<Sale, "id">): Promise<ApiResponse<Sale>> {
    return this.request<Sale>("/sales", {
      method: "POST",
      body: JSON.stringify(sale),
    })
  }

  // Purchases endpoints
  async getPurchases(): Promise<ApiResponse<Purchase[]>> {
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockPurchases: Purchase[] = [
      {
        id: "1",
        date: "2024-01-15",
        supplier: "Proveedor A",
        total: 850.00,
        status: "Completada",
        items: [
          { product: "Aceitunas Verdes 500g", quantity: 50, unitCost: 8.5 },
          { product: "Aceitunas Negras 500g", quantity: 30, unitCost: 10.0 }
        ]
      },
      {
        id: "2",
        date: "2024-01-14",
        supplier: "Proveedor B",
        total: 450.00,
        status: "Pendiente",
        items: [
          { product: "Mermelada de Fresa 250g", quantity: 40, unitCost: 6.0 },
          { product: "Aceite de Oliva 1L", quantity: 15, unitCost: 18.0 }
        ]
      },
      {
        id: "3",
        date: "2024-01-13",
        supplier: "Proveedor C",
        total: 320.00,
        status: "Completada",
        items: [
          { product: "Manzanas Rojas", quantity: 100, unitCost: 2.5 },
          { product: "Aceite de Oliva 1L", quantity: 8, unitCost: 18.0 }
        ]
      }
    ]
    
    return {
      data: mockPurchases,
      message: "Purchases retrieved successfully",
      success: true
    }
  }

  async createPurchase(purchase: Omit<Purchase, "id">): Promise<ApiResponse<Purchase>> {
    return this.request<Purchase>("/purchases", {
      method: "POST",
      body: JSON.stringify(purchase),
    })
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<ApiResponse<{
    totalSales: number
    totalProducts: number
    lowStockProducts: number
    recentSales: Sale[]
  }>> {
    return this.request("/dashboard/stats")
  }
}

export const apiService = new ApiService() 