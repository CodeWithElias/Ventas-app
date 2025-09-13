
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Download } from "lucide-react"
import { NewSaleDialog } from "./new-sale-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Sale {
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

const mockSales: Sale[] = [
  {
    id: "1",
    date: "2024-01-15T10:30:00",
    customer: "Cliente General",
    total: 45.5,
    paymentMethod: "Efectivo",
    items: [
      { product: "Aceitunas Verdes 500g", quantity: 2, unitPrice: 12.5 },
      { product: "Mermelada de Fresa 250g", quantity: 1, unitPrice: 8.75 },
      { product: "Aceite de Oliva 1L", quantity: 1, unitPrice: 25.0 },
    ],
  },
  {
    id: "2",
    date: "2024-01-15T14:15:00",
    customer: "María González",
    total: 28.0,
    paymentMethod: "Tarjeta",
    items: [{ product: "Aceitunas Negras 500g", quantity: 2, unitPrice: 14.0 }],
  },
  {
    id: "3",
    date: "2024-01-14T16:45:00",
    customer: "Juan Pérez",
    total: 17.5,
    paymentMethod: "Efectivo",
    items: [{ product: "Manzanas Rojas", quantity: 5, unitPrice: 3.5 }],
  },
]

export function SalesPage() {
  const [sales] = useState<Sale[]>(mockSales)
  const [showNewSaleDialog, setShowNewSaleDialog] = useState(false)

  const generateReceipt = (sale: Sale) => {
    // Simular generación de PDF
    console.log("Generando comprobante para venta:", sale.id)

    // En una implementación real, aquí usarías una librería como jsPDF
    const receiptContent = `
COMPROBANTE DE VENTA
====================
ID: ${sale.id}
Fecha: ${new Date(sale.date).toLocaleString("es-ES")}
Cliente: ${sale.customer}

PRODUCTOS:
${sale.items
  .map((item) => `${item.product} x${item.quantity} - $${(item.quantity * item.unitPrice).toFixed(2)}`)
  .join("\n")}

TOTAL: $${sale.total.toFixed(2)}
Método de pago: ${sale.paymentMethod}
    `

    // Crear y descargar archivo de texto como ejemplo
    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `comprobante-${sale.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getTodaySales = () => {
    const today = new Date().toDateString()
    return sales.filter((sale) => new Date(sale.date).toDateString() === today)
  }

  const getTodayTotal = () => {
    return getTodaySales().reduce((total, sale) => total + sale.total, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ventas</h1>
          <p className="text-muted-foreground">Registra ventas y genera comprobantes</p>
        </div>
        <Button onClick={() => setShowNewSaleDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Venta
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ventas de Hoy</CardDescription>
            <CardTitle className="text-2xl">{getTodaySales().length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Hoy</CardDescription>
            <CardTitle className="text-2xl">${getTodayTotal().toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Promedio por Venta</CardDescription>
            <CardTitle className="text-2xl">
              ${getTodaySales().length > 0 ? (getTodayTotal() / getTodaySales().length).toFixed(2) : "0.00"}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Ventas</CardTitle>
          <CardDescription>Registro de todas las ventas realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{new Date(sale.date).toLocaleString("es-ES")}</TableCell>
                  <TableCell className="font-medium">{sale.customer}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {sale.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.product} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${sale.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{sale.paymentMethod}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => generateReceipt(sale)}>
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NewSaleDialog open={showNewSaleDialog} onOpenChange={setShowNewSaleDialog} />
    </div>
  )
}
