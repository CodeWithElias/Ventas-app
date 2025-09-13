import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ShoppingCart } from "lucide-react"
import { NewSaleDialog } from "./new-sale-dialog"
import { useSales } from "@/hooks/use-sales"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorMessage } from "@/components/common/error-message"
import { EmptyState } from "@/components/common/empty-state"

export function SalesPage() {
  const { sales, isLoading, error } = useSales()
  const [showNewSaleDialog, setShowNewSaleDialog] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ventas</h1>
          <p className="text-muted-foreground">Gestiona las ventas de tu negocio</p>
        </div>
        <Button onClick={() => setShowNewSaleDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Venta
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Ventas</CardTitle>
          <CardDescription>
            Lista de todas las ventas realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <EmptyState
              title="No hay ventas registradas"
              description="Comienza registrando tu primera venta."
              icon={ShoppingCart}
              action={{
                label: "Nueva Venta",
                onClick: () => setShowNewSaleDialog(true)
              }}
            />
          ) : (
            <div className="space-y-4">
              {sales.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Venta #{sale.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sale.customer} • {sale.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${sale.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {sale.paymentMethod}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <NewSaleDialog
        open={showNewSaleDialog}
        onOpenChange={setShowNewSaleDialog}
      />
    </div>
  )
} 