import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ProductFormData } from "@/types"
import { Camera, QrCode } from "lucide-react"
import { Html5Qrcode } from "html5-qrcode"

interface AddProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    stock: 0,
    unit: "",
    price: 0,
    minStock: 0,
    supplier: "",
    description: "",
    barcode: "",
    qrCode: "",
  })
  const [scanning, setScanning] = useState(false)
  const { toast } = useToast()
  const html5QrcodeScannerRef = useRef<Html5Qrcode | null>(null)

  const startScanner = () => {
    if (scanning) return
    setScanning(true)
    const config = { fps: 10, qrbox: 250 }
    const html5QrcodeScanner = new Html5Qrcode("reader")
    html5QrcodeScannerRef.current = html5QrcodeScanner
    html5QrcodeScanner
      .start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          setFormData((prev) => ({ ...prev, barcode: decodedText }))
          stopScanner()
          toast({
            title: "Código escaneado",
            description: `Código de barras detectado: ${decodedText}`,
          })
        },
        (_errorMessage) => {
          // console.log(`Error scanning: ${_errorMessage}`)
        }
      )
      .catch((err) => {
        toast({
          title: "Error al iniciar el escáner",
          description: err.message,
          variant: "destructive",
        })
        setScanning(false)
      })
  }

  const stopScanner = () => {
    if (!scanning) return
    html5QrcodeScannerRef.current?.stop().then(() => {
      html5QrcodeScannerRef.current?.clear()
      setScanning(false)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí iría la llamada a la API
    console.log("Producto a agregar:", formData)

    toast({
      title: "Producto agregado",
      description: "El producto se ha agregado correctamente al inventario.",
    })

    // Resetear formulario
    setFormData({
      name: "",
      category: "",
      stock: 0,
      unit: "",
      price: 0,
      minStock: 0,
      supplier: "",
      description: "",
    })

    onOpenChange(false)
  }

  const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) stopScanner()
      onOpenChange(open)
    }}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
          <DialogDescription>Completa la información del producto para agregarlo al inventario.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aceitunas">Aceitunas</SelectItem>
                  <SelectItem value="frutas">Frutas</SelectItem>
                  <SelectItem value="conservas">Conservas</SelectItem>
                  <SelectItem value="aceites">Aceites</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Inicial *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", parseInt(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unidad de Medida *</Label>
              <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unidades">Unidades</SelectItem>
                  <SelectItem value="kg">Kilogramos</SelectItem>
                  <SelectItem value="litros">Litros</SelectItem>
                  <SelectItem value="gramos">Gramos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio de Venta *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minStock">Stock Mínimo *</Label>
              <Input
                id="minStock"
                type="number"
                min="0"
                value={formData.minStock}
                onChange={(e) => handleInputChange("minStock", parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Proveedor</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => handleInputChange("supplier", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="barcode">Código de Barras</Label>
            <div className="flex gap-2">
              <Input
                id="barcode"
                value={formData.barcode}
                onChange={(e) => handleInputChange("barcode", e.target.value)}
                placeholder="Escanea o ingresa el código"
              />
              <Button
                type="button"
                variant="outline"
                onClick={scanning ? stopScanner : startScanner}
                className="flex items-center gap-2"
              >
                {scanning ? <Camera className="h-4 w-4" /> : <QrCode className="h-4 w-4" />}
                {scanning ? "Detener" : "Escanear"}
              </Button>
            </div>
            {scanning && (
              <div id="reader" className="w-full max-w-sm mx-auto border rounded-md overflow-hidden"></div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Agregar Producto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 