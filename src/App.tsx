import { AuthProvider } from "@/features/auth/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import AppRoutes from "./routes"

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  )
}

export default App 