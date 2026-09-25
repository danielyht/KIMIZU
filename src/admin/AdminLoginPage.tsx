import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { NightSky } from '../components/NightSky'
import { useAuth } from './authContext'

export function AdminLoginPage() {
  const { signIn, user, loading, configured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to={from} replace />
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-16">
      <NightSky />
      <form onSubmit={onSubmit} className="glass relative z-10 w-full max-w-md space-y-5 rounded-3xl p-8">
        <div className="text-center">
          <Logo size="sm" />
          <h1 className="mt-4 font-display text-2xl font-semibold">Entrar no admin</h1>
          <p className="mt-2 text-sm text-ink-soft">Use o e-mail e a senha criados no Supabase Auth.</p>
        </div>

        {!configured && (
          <p className="rounded-2xl border border-sakura/40 bg-sakura/10 px-4 py-3 text-sm text-ink">
            Configure as variáveis do Supabase antes de entrar.
          </p>
        )}

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">E-mail</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-lilac-light/30 bg-night-900/60 px-4 py-3 text-ink outline-none focus:border-crystal-light"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Senha</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-lilac-light/30 bg-night-900/60 px-4 py-3 text-ink outline-none focus:border-crystal-light"
          />
        </label>

        {error ? <p className="text-sm text-sakura-light">{error}</p> : null}

        <button type="submit" className="btn-primary w-full" disabled={submitting || !configured}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </button>

        <p className="text-center text-sm text-ink-soft">
          <Link to="/" className="text-crystal-light hover:underline">
            ← Voltar para a vitrine
          </Link>
        </p>
      </form>
    </div>
  )
}
