import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, ShoppingBag } from "lucide-react"
import { AddPurchaseDialog } from "./add-purchase-dialog"
import { usePurchases } from "@/hooks/use-purchases"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorMessage } from "@/components/common/error-message"
import { EmptyState } from "@/components/common/empty-state"

export function PurchasesPage() {
  const { purchases, isLoading, error } = usePurchases()
  const [showAddDialog, setShowAddDialog] = useState(false)

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
          <h1 className="text-3xl font-bold tracking-tight">Compras</h1>
          <p className="text-muted-foreground">Gestiona las compras a proveedores</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Compra
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Compras</CardTitle>
          <CardDescription>
            Lista de todas las compras realizadas a proveedores
          </CardDescription>
        </CardHeader>
        <CardContent>
          {purchases.length === 0 ? (
            <EmptyState
              title="No hay compras registradas"
              description="Comienza registrando tu primera compra a un proveedor."
              icon={ShoppingBag}
              action={{
                label: "Nueva Compra",
                onClick: () => setShowAddDialog(true)
              }}
            />
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Compra #{purchase.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {purchase.supplier} • {purchase.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">${purchase.total.toFixed(2)}</p>
                      <Badge variant={
                        purchase.status === "Completada" ? "default" :
                        purchase.status === "Pendiente" ? "secondary" : "destructive"
                      }>
                        {purchase.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddPurchaseDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  )
} 