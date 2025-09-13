
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

interface AddPurchaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface PurchaseItem {
  id: string
  product: string
  quantity: number
  unitCost: number
}

const mockProducts = [
  "Aceitunas Verdes 500g",
  "Aceitunas Negras 500g",
  "Mermelada de Fresa 250g",
  "Aceite de Oliva 1L",
  "Manzanas Rojas",
]

const mockSuppliers = ["Proveedor A", "Proveedor B", "Proveedor C", "Proveedor D"]

export function AddPurchaseDialog({ open, onOpenChange }: AddPurchaseDialogProps) {
  const [supplier, setSupplier] = useState("")
  const [items, setItems] = useState<PurchaseItem[]>([])
  const [newItem, setNewItem] = useState({
    product: "",
    quantity: "",
    unitCost: "",
  })
  const { toast } = useToast()

  const addItem = () => {
    if (newItem.product && newItem.quantity && newItem.unitCost) {
      const item: PurchaseItem = {
        id: Date.now().toString(),
        product: newItem.product,
        quantity: Number.parseInt(newItem.quantity),
        unitCost: Number.parseFloat(newItem.unitCost),
      }
      setItems([...items, item])
      setNewItem({ product: "", quantity: "", unitCost: "" })
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const getTotalCost = () => {
    return items.reduce((total, item) => total + item.quantity * item.unitCost, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!supplier || items.length === 0) {
      toast({
        title: "Error",
        description: "Debes seleccionar un proveedor y agregar al menos un producto.",
        variant: "destructive",
      })
      return
    }

    // Aquí iría la llamada a la API
    console.log("Compra a registrar:", { supplier, items, total: getTotalCost() })

    toast({
      title: "Compra registrada",
      description: "La compra se ha registrado correctamente.",
    })

    // Resetear formulario
    setSupplier("")
    setItems([])
    setNewItem({ product: "", quantity: "", unitCost: "" })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Compra</DialogTitle>
          <DialogDescription>Completa la información de la compra a proveedor.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="supplier">Proveedor *</Label>
            <Select value={supplier} onValueChange={setSupplier}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar proveedor" />
              </SelectTrigger>
              <SelectContent>
                {mockSuppliers.map((sup) => (
                  <SelectItem key={sup} value={sup}>
                    {sup}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Productos</Label>

            <div className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-5">
                <Label htmlFor="product" className="text-sm">
                  Producto
                </Label>
                <Select value={newItem.product} onValueChange={(value) => setNewItem({ ...newItem, product: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((product) => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
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

              <div className="col-span-3">
                <Label htmlFor="unitCost" className="text-sm">
                  Costo Unitario
                </Label>
                <Input
                  id="unitCost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newItem.unitCost}
                  onChange={(e) => setNewItem({ ...newItem, unitCost: e.target.value })}
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
                      <TableHead>Costo Unit.</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                        <TableCell>${(item.quantity * item.unitCost).toFixed(2)}</TableCell>
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
                      <TableCell className="font-semibold">${getTotalCost().toFixed(2)}</TableCell>
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
            <Button type="submit">Registrar Compra</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
