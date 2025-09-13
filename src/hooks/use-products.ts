import { useState, useEffect } from "react"
import { Product } from "@/types"
import { apiService } from "@/services/api"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiService.getProducts()
      setProducts(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar productos")
    } finally {
      setIsLoading(false)
    }
  }

  const createProduct = async (productData: Omit<Product, "id">) => {
    try {
      const response = await apiService.createProduct(productData)
      setProducts(prev => [...prev, response.data])
      return response.data
    } catch (err) {
      throw err instanceof Error ? err : new Error("Error al crear producto")
    }
  }

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const response = await apiService.updateProduct(id, productData)
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? response.data : product
        )
      )
      return response.data
    } catch (err) {
      throw err instanceof Error ? err : new Error("Error al actualizar producto")
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      await apiService.deleteProduct(id)
      setProducts(prev => prev.filter(product => product.id !== id))
    } catch (err) {
      throw err instanceof Error ? err : new Error("Error al eliminar producto")
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  }
} 