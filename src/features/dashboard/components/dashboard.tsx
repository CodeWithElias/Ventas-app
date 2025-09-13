import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react"

const stats = [
  {
    name: "Productos en Stock",
    value: "156",
    icon: Package,
    change: "+12%",
    changeType: "positive" as const,
  },
  {
    name: "Ventas del Mes",
    value: "$24,500",
    icon: TrendingUp,
    change: "+8%",
    changeType: "positive" as const,
  },
  {
    name: "Compras Pendientes",
    value: "8",
    icon: ShoppingCart,
    change: "-2",
    changeType: "negative" as const,
  },
  {
    name: "Stock Bajo",
    value: "5",
    icon: AlertTriangle,
    change: "+1",
    changeType: "negative" as const,
  },
]

export function Dashboard() {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
        <p className="text-muted-foreground">Resumen general de tu negocio</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.change} desde el mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Productos con Stock Bajo</CardTitle>
            <CardDescription>Productos que necesitan reposición urgente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Aceitunas Verdes 500g", stock: 5, min: 20 },
                { name: "Mermelada de Fresa 250g", stock: 8, min: 15 },
                { name: "Aceite de Oliva 1L", stock: 12, min: 25 },
              ].map((product) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock actual: {product.stock} | Mínimo: {product.min}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Crítico
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas transacciones del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Venta registrada", amount: "$125.50", time: "Hace 5 min" },
                { action: "Compra agregada", amount: "$850.00", time: "Hace 1 hora" },
                { action: "Producto actualizado", amount: "Aceitunas Negras", time: "Hace 2 horas" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{activity.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 