
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2 } from "lucide-react"

interface NewSaleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SaleItem {
  id: string
  product: string
  quantity: number
  unitPrice: number
  stock: number
}

const mockProducts = [
  { name: "Aceitunas Verdes 500g", price: 12.5, stock: 5 },
  { name: "Aceitunas Negras 500g", price: 14.0, stock: 35 },
  { name: "Mermelada de Fresa 250g", price: 8.75, stock: 8 },
  { name: "Aceite de Oliva 1L", price: 25.0, stock: 12 },
  { name: "Manzanas Rojas", price: 3.5, stock: 50 },
]

export function NewSaleDialog({ open, onOpenChange }: NewSaleDialogProps) {
  const [customer, setCustomer] = useState("Cliente General")
  const [paymentMethod, setPaymentMethod] = useState<"Efectivo" | "Tarjeta" | "Transferencia">("Efectivo")
  const [items, setItems] = useState<SaleItem[]>([])
  const [newItem, setNewItem] = useState({
    product: "",
    quantity: "",
  })
  const { toast } = useToast()

  const addItem = () => {
    if (newItem.product && newItem.quantity) {
      const product = mockProducts.find((p) => p.name === newItem.product)
      if (product) {
        const quantity = Number.parseInt(newItem.quantity)

        if (quantity > product.stock) {
          toast({
            title: "Stock insuficiente",
            description: `Solo hay ${product.stock} unidades disponibles.`,
            variant: "destructive",
          })
          return
        }

        const item: SaleItem = {
          id: Date.now().toString(),
          product: newItem.product,
          quantity: quantity,
          unitPrice: product.price,
          stock: product.stock,
        }
        setItems([...items, item])
        setNewItem({ product: "", quantity: "" })
      }
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Debes agregar al menos un producto a la venta.",
        variant: "destructive",
      })
      return
    }

    // Aquí iría la llamada a la API
    const saleData = {
      customer,
      paymentMethod,
      items,
      total: getTotalAmount(),
      date: new Date().toISOString(),
    }

    console.log("Venta a registrar:", saleData)

    toast({
      title: "Venta registrada",
      description: "La venta se ha registrado correctamente.",
    })

    // Resetear formulario
    setCustomer("Cliente General")
    setPaymentMethod("Efectivo")
    setItems([])
    setNewItem({ product: "", quantity: "" })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Venta</DialogTitle>
          <DialogDescription>Registra una nueva venta y genera el comprobante.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Cliente</Label>
              <Input id="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Método de Pago</Label>
              <Select value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Efectivo">Efectivo</SelectItem>
                  <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="Transferencia">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Productos</Label>

            <div className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-7">
                <Label htmlFor="product" className="text-sm">
                  Producto
                </Label>
                <Select value={newItem.product} onValueChange={(value) => setNewItem({ ...newItem, product: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((product) => (
                      <SelectItem key={product.name} value={product.name}>
                        {product.name} - ${product.price.toFixed(2)} (Stock: {product.stock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-3">
                <Label htmlFor="quantity" className="text-sm">
                  Cantidad
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                />
              </div>

              <div className="col-span-2">
                <Button type="button" onClick={addItem} size="sm" className="w-full">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {items.length > 0 && (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Precio Unit.</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="font-semibold">
                        Total:
                      </TableCell>
                      <TableCell className="font-semibold">${getTotalAmount().toFixed(2)}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Registrar Venta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
