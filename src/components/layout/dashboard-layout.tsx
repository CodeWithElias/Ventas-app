import { useAuth } from "@/features/auth/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Package, ShoppingCart, TrendingUp, BarChart3, Menu, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Inventario", href: "/inventory", icon: Package },
  { name: "Compras", href: "/purchases", icon: ShoppingCart },
  { name: "Ventas", href: "/sales", icon: TrendingUp },
  { name: "Reportes", href: "/reports", icon: BarChart3 },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const location = useLocation()

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("flex flex-col h-full", mobile ? "w-full" : "w-64")}>
      <div className="flex items-center h-16 px-4 border-b">
        <Package className="h-8 w-8 text-primary" />
        <span className="ml-2 text-lg font-semibold">VentasApp</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center mb-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={logout} className="w-full bg-transparent">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet>
        <div className="flex flex-col flex-1">
          <div className="flex items-center h-16 px-4 border-b md:hidden">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <span className="ml-2 text-lg font-semibold">VentasApp</span>
          </div>

          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>

        <SheetContent side="left" className="p-0 w-64">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>
    </div>
  )
}
