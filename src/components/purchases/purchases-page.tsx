
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { AddPurchaseDialog } from "./add-purchase-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Purchase {
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

const mockPurchases: Purchase[] = [
  {
    id: "1",
    date: "2024-01-15",
    supplier: "Proveedor A",
    total: 850.0,
    status: "Completada",
    items: [
      { product: "Aceitunas Verdes 500g", quantity: 50, unitCost: 10.0 },
      { product: "Aceitunas Negras 500g", quantity: 25, unitCost: 14.0 },
    ],
  },
  {
    id: "2",
    date: "2024-01-14",
    supplier: "Proveedor B",
    total: 420.0,
    status: "Pendiente",
    items: [{ product: "Mermelada de Fresa 250g", quantity: 48, unitCost: 8.75 }],
  },
  {
    id: "3",
    date: "2024-01-13",
    supplier: "Proveedor C",
    total: 625.0,
    status: "Completada",
    items: [{ product: "Aceite de Oliva 1L", quantity: 25, unitCost: 25.0 }],
  },
]

export function PurchasesPage() {
  const [purchases] = useState<Purchase[]>(mockPurchases)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const getStatusVariant = (status: Purchase["status"]) => {
    switch (status) {
      case "Completada":
        return "default"
      case "Pendiente":
        return "secondary"
      case "Cancelada":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compras</h1>
          <p className="text-muted-foreground">Registra y gestiona las compras a proveedores</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Compra
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total del Mes</CardDescription>
            <CardTitle className="text-2xl">$1,895.00</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Compras Pendientes</CardDescription>
            <CardTitle className="text-2xl">2</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Proveedores Activos</CardDescription>
            <CardTitle className="text-2xl">5</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Compras</CardTitle>
          <CardDescription>Registro de todas las compras realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{new Date(purchase.date).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell className="font-medium">{purchase.supplier}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {purchase.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.product} ({item.quantity} unidades)
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${purchase.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(purchase.status)}>{purchase.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddPurchaseDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
