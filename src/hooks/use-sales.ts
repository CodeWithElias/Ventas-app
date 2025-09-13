import { useState, useEffect } from "react"
import { Sale } from "@/types"
import { apiService } from "@/services/api"

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSales = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiService.getSales()
      setSales(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar ventas")
    } finally {
      setIsLoading(false)
    }
  }

  const createSale = async (saleData: Omit<Sale, "id">) => {
    try {
      const response = await apiService.createSale(saleData)
      setSales(prev => [...prev, response.data])
      return response.data
    } catch (err) {
      throw err instanceof Error ? err : new Error("Error al crear venta")
    }
  }

  useEffect(() => {
    fetchSales()
  }, [])

  return {
    sales,
    isLoading,
    error,
    createSale,
    refetch: fetchSales,
  }
} 