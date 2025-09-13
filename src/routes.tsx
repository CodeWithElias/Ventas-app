import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from "@/features/auth/contexts/auth-context"
import { LoginForm } from "@/features/auth/components/login-form"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Dashboard } from "@/features/dashboard/components/dashboard"
import { InventoryPage } from "@/features/inventory/components/inventory-page"
import { SalesPage } from "@/features/sales/components/sales-page"
import { PurchasesPage } from "@/features/purchases/components/purchases-page"
import { ReportsPage } from "@/features/reports/components/reports-page"
import { LoadingSpinner } from "@/components/common/loading-spinner"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  const { user } = useAuth()

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/inventory" element={
        <ProtectedRoute>
          <DashboardLayout>
            <InventoryPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/sales" element={
        <ProtectedRoute>
          <DashboardLayout>
            <SalesPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/purchases" element={
        <ProtectedRoute>
          <DashboardLayout>
            <PurchasesPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ReportsPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes 