import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './authContext'

/** Protege rotas de admin: exige sessão autenticada. */
export function RequireAuth() {
  const { user, loading, configured } = useAuth()
  const location = useLocation()

  if (!configured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night-950 px-5 text-center">
        <div className="glass max-w-md rounded-3xl p-8">
          <h1 className="font-display text-2xl font-semibold">Supabase não configurado</h1>
          <p className="mt-3 text-sm text-ink-soft">
            Defina <code className="text-crystal-light">VITE_SUPABASE_URL</code> e{' '}
            <code className="text-crystal-light">VITE_SUPABASE_ANON_KEY</code> no{' '}
            <code className="text-crystal-light">.env.local</code> e no Vercel. Veja o README.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night-950 text-ink-soft">
        Carregando…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
