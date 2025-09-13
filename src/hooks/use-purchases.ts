import { useState, useEffect } from "react"
import { Purchase } from "@/types"
import { apiService } from "@/services/api"

export function usePurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPurchases = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiService.getPurchases()
      setPurchases(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar compras")
    } finally {
      setIsLoading(false)
    }
  }

  const createPurchase = async (purchaseData: Omit<Purchase, "id">) => {
    try {
      const response = await apiService.createPurchase(purchaseData)
      setPurchases(prev => [...prev, response.data])
      return response.data
    } catch (err) {
      throw err instanceof Error ? err : new Error("Error al crear compra")
    }
  }

  useEffect(() => {
    fetchPurchases()
  }, [])

  return {
    purchases,
    isLoading,
    error,
    createPurchase,
    refetch: fetchPurchases,
  }
} 