import { CATEGORIES, CATEGORY_LABEL, type Product } from '../data/products'
import { StarSparkle } from './StarSparkle'

type ProductImageProps = {
  product: Product
  className?: string
}

/** Imagem do produto: usa a foto quando existir, senão mostra um placeholder no estilo Kimizu. */
export function ProductImage({ product, className = '' }: ProductImageProps) {
  const CategoryIcon = CATEGORIES.find((c) => c.id === product.category)?.Icon

  if (product.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={`Foto do produto ${product.name} (${CATEGORY_LABEL[product.category]}), em breve`}
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden bg-gradient-to-br from-crystal/25 via-lilac/20 to-sakura/15 ${className}`}
    >
      <StarSparkle size={16} tone="ink" className="absolute left-[12%] top-[14%]" />
      <StarSparkle size={12} tone="sakura" delay={1} className="absolute right-[16%] top-[22%]" />
      {CategoryIcon ? <CategoryIcon size={52} className="drop-shadow-glow-lilac" /> : null}
      <span className="font-display text-[0.65rem] uppercase tracking-[0.25em] text-ink-soft">
        foto em breve
      </span>
    </div>
  )
}
