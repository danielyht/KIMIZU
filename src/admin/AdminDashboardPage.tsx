import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { NightSky } from '../components/NightSky'
import { CATEGORY_LABEL, TAG_LABEL, type Product } from '../data/products'
import { formatPrice } from '../lib/format'
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from '../lib/productsApi'
import { useAuth } from './authContext'
import { ProductForm } from './ProductForm'

export function AdminDashboardPage() {
  const { user, signOut } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Product | null>(null)
  const [creating, setCreating] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    try {
      const list = await fetchProducts()
      setProducts(list)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const list = await fetchProducts()
        if (!cancelled) setProducts(list)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erro ao carregar.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const handleSave = async (product: Product) => {
    if (creating) {
      await createProduct(product, products.length + 1)
    } else if (editing) {
      await updateProduct(product)
    }
    setCreating(false)
    setEditing(null)
    await load()
  }

  const handleDelete = async (product: Product) => {
    const ok = window.confirm(`Apagar "${product.name}"? Essa ação não tem volta.`)
    if (!ok) return
    setBusyId(product.id)
    try {
      await deleteProduct(product.id)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao apagar.')
    } finally {
      setBusyId(null)
    }
  }

  const showForm = creating || editing

  return (
    <div className="relative min-h-screen pb-20">
      <NightSky />
      <header className="sticky top-0 z-20 border-b border-lilac-light/15 bg-night-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span className="font-display text-sm text-ink-soft">Admin</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-ink-soft">{user?.email}</span>
            <Link to="/" className="text-crystal-light hover:underline">
              Ver vitrine
            </Link>
            <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={() => void signOut()}>
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl space-y-8 px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">Produtos</h1>
            <p className="mt-1 text-sm text-ink-soft">Crie, edite ou remova itens da vitrine.</p>
          </div>
          {!showForm && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setEditing(null)
                setCreating(true)
              }}
            >
              Novo produto
            </button>
          )}
        </div>

        {error ? <p className="text-sm text-sakura-light">{error}</p> : null}

        {showForm ? (
          <ProductForm
            initial={editing}
            lockId={Boolean(editing)}
            onSubmit={handleSave}
            onCancel={() => {
              setCreating(false)
              setEditing(null)
            }}
          />
        ) : null}

        {loading ? (
          <p className="text-ink-soft">Carregando produtos…</p>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-lilac-light/20">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-night-900/70 text-ink-soft">
                <tr>
                  <th className="px-4 py-3 font-display font-medium">Nome</th>
                  <th className="px-4 py-3 font-display font-medium">Categoria</th>
                  <th className="px-4 py-3 font-display font-medium">Preço</th>
                  <th className="px-4 py-3 font-display font-medium">Etiqueta</th>
                  <th className="px-4 py-3 font-display font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-lilac-light/10 bg-night-950/40">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{product.name}</p>
                      <p className="text-xs text-ink-soft">{product.id}</p>
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{CATEGORY_LABEL[product.category]}</td>
                    <td className="px-4 py-3 text-crystal-light">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3 text-ink-soft">{product.tag ? TAG_LABEL[product.tag] : '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded-full border border-lilac-light/30 px-3 py-1 text-xs hover:border-crystal-light/50"
                          onClick={() => {
                            setCreating(false)
                            setEditing(product)
                          }}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-sakura/40 px-3 py-1 text-xs text-sakura-light hover:border-sakura"
                          disabled={busyId === product.id}
                          onClick={() => void handleDelete(product)}
                        >
                          Apagar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-ink-soft">
                      Nenhum produto ainda. Clique em “Novo produto”.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
