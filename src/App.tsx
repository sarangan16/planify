import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/authStore'
import DashboardPage from '@/pages/DashboardPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import { useTasks } from '@/hooks/useTasks'

function AppRoutes() {
  const { loading } = useAuth()
  const user = useAuthStore((state) => state.user)
  useTasks()

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="/analytics" element={user ? <AnalyticsPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App