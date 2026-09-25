import { productWhatsappMessage, whatsappLink } from '../config'
import { TAG_LABEL, type Product, type ProductTag } from '../data/products'
import { formatPrice } from '../lib/format'
import { GlassCard } from './GlassCard'
import { HeartIcon } from './icons'
import { ProductImage } from './ProductImage'
import { StarSparkle } from './StarSparkle'

const TAG_BADGE_CLASS: Record<ProductTag, string> = {
  novo: 'bg-crystal-lilac text-white shadow-glow-crystal',
  fofo: 'border border-sakura/50 bg-sakura/20 text-ink',
  'pre-venda': 'border border-lilac-light/50 bg-lilac/25 text-ink',
  'edicao-limitada': 'bg-heart-gradient text-ink shadow-glow-lilac',
  'mais-amado': 'border border-plum-light/60 bg-plum/40 text-ink',
}

/** Estrelinhas e coraçõezinhos extras para os cards de pré-venda e edição limitada. */
function SpecialSparkles({ tag }: { tag?: ProductTag }) {
  if (tag !== 'edicao-limitada' && tag !== 'pre-venda') return null

  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <StarSparkle size={16} tone="sakura" className="absolute left-[8%] top-[10%]" />
      <StarSparkle size={12} tone="crystal" delay={1.2} className="absolute right-[10%] top-[16%]" />
      <HeartIcon
        size={16}
        tone={tag === 'edicao-limitada' ? 'sakura' : 'lilac'}
        className="absolute bottom-[8%] left-[10%] animate-float drop-shadow-glow-lilac"
      />
    </span>
  )
}

type ProductCardProps = {
  product: Product
  onOpen: (product: Product) => void
}

/**
 * Card de produto: imagem, nome, descrição curta, preço, etiqueta e botão de WhatsApp.
 * A imagem e o nome abrem o modal (um único botão, sem elementos interativos aninhados);
 * o botão de WhatsApp fica fora dele, como um controle independente.
 */
export function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <GlassCard interactive padding="none" className="flex h-full flex-col overflow-hidden">
      <button
        type="button"
        onClick={() => onOpen(product)}
        aria-haspopup="dialog"
        className="block w-full text-left"
      >
        <div className="relative">
          <ProductImage product={product} className="aspect-[4/5] w-full" />
          <SpecialSparkles tag={product.tag} />
          {product.tag ? (
            <span
              className={`absolute right-3 top-3 rounded-full px-3 py-1 font-display text-xs font-semibold lowercase tracking-wide ${TAG_BADGE_CLASS[product.tag]}`}
            >
              {TAG_LABEL[product.tag]}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 p-5 pb-3">
          <h3 className="font-display text-base font-semibold leading-snug">{product.name}</h3>
          <p className="text-sm text-ink-soft">{product.shortDescription}</p>
        </div>
      </button>

      <div className="mt-auto flex flex-col gap-3 px-5 pb-5">
        <p className="font-display text-lg font-semibold text-gradient">{formatPrice(product.price)}</p>

        <a
          href={whatsappLink(productWhatsappMessage(product.name))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-sm"
        >
          Quero saber mais
        </a>
      </div>
    </GlassCard>
  )
}
