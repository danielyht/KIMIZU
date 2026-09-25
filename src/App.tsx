import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminDashboardPage } from './admin/AdminDashboardPage'
import { AdminLoginPage } from './admin/AdminLoginPage'
import { AuthProvider } from './admin/AuthProvider'
import { RequireAuth } from './admin/RequireAuth'
import { StorefrontPage } from './pages/StorefrontPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<StorefrontPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<RequireAuth />}>
            <Route index element={<AdminDashboardPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
