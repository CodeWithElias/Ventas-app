import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  ShoppingBag, 
  BarChart3,
  Users,
  Settings
} from "lucide-react"
import { NavItem } from "@/types"

export const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Inventario",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Ventas",
    href: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "Compras",
    href: "/purchases",
    icon: ShoppingBag,
  },
  {
    title: "Reportes",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Usuarios",
    href: "/users",
    icon: Users,
    role: "Administrador",
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
    role: "Administrador",
  },
]

export const userMenuItems = [
  {
    title: "Perfil",
    href: "/profile",
  },
  {
    title: "Configuración",
    href: "/settings",
  },
] 