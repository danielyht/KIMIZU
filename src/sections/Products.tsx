import { useEffect, useMemo, useState } from 'react'
import { CategoryPills } from '../components/CategoryPills'
import { MascotSlot } from '../components/MascotSlot'
import { ProductCard } from '../components/ProductCard'
import { ProductModal } from '../components/ProductModal'
import { StarSparkle } from '../components/StarSparkle'
import { CATEGORY_LABEL, type Product } from '../data/products'
import { fetchProducts } from '../lib/productsApi'

/** Vitrine de produtos: filtro por categoria, grid de cards e modal com detalhes. */
export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [openProduct, setOpenProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    fetchProducts().then((list) => {
      if (alive) {
        setProducts(list)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [])

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'todos') return products
    return products.filter((product) => product.category === selectedCategory)
  }, [selectedCategory, products])

  return (
    <section id="produtos" className="relative px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="jp-signature mb-3 inline-flex items-center gap-2 text-sm">
            <StarSparkle size={14} tone="sakura" />
            vitrine
          </span>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Nossos pequenos tesouros</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Roupas, pelúcias, photocards e muito mais para deixar o seu cantinho de fã ainda mais especial.
          </p>
        </div>

        <div className="mb-10">
          <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {loading ? (
          <p className="py-10 text-center text-ink-soft">Carregando tesourinhos…</p>
        ) : filteredProducts.length > 0 ? (
          <div>
            <p className="mb-3 text-center font-display text-xs tracking-[0.2em] text-ink-soft lowercase">
              deslize para o lado ✦
            </p>
            <div
              className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] sm:mx-0 sm:gap-6 sm:px-1 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lilac/40"
              role="list"
              aria-label="Lista de produtos"
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  role="listitem"
                  className="w-[min(78vw,18.5rem)] shrink-0 snap-center sm:w-72 lg:w-80"
                >
                  <ProductCard product={product} onOpen={setOpenProduct} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <MascotSlot expression="fofo" size="md" />
            <p className="max-w-sm text-ink-soft">
              Ainda não temos itens em {CATEGORY_LABEL[selectedCategory as keyof typeof CATEGORY_LABEL] ?? 'categoria'}
              , mas novidades chegam a cada comeback. Volta aqui em breve! ✦
            </p>
          </div>
        )}
      </div>

      <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />
    </section>
  )
}
