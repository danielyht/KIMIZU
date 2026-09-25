import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { productWhatsappMessage, whatsappLink } from '../config'
import { TAG_LABEL, type Product, type ProductTag } from '../data/products'
import { formatPrice } from '../lib/format'
import { HeartIcon } from './icons'
import { ProductImage } from './ProductImage'

const TAG_BADGE_CLASS: Record<ProductTag, string> = {
  novo: 'bg-crystal-lilac text-white shadow-glow-crystal',
  fofo: 'border border-sakura/50 bg-sakura/20 text-ink',
  'pre-venda': 'border border-lilac-light/50 bg-lilac/25 text-ink',
  'edicao-limitada': 'bg-heart-gradient text-ink shadow-glow-lilac',
  'mais-amado': 'border border-plum-light/60 bg-plum/40 text-ink',
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function CloseIcon() {
  return (
    <span className="relative block h-4 w-4" aria-hidden="true">
      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rotate-45 rounded-full bg-ink" />
      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 -rotate-45 rounded-full bg-ink" />
    </span>
  )
}

type ProductModalProps = {
  product: Product | null
  onClose: () => void
}

/** Modal do produto: foco preso, ESC fecha, clique fora fecha. */
export function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!product) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [product, onClose])

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-night-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass relative z-10 grid max-h-[90vh] w-full max-w-3xl gap-0 overflow-y-auto rounded-3xl sm:grid-cols-2"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-lilac-light/30 bg-night-900/60 transition hover:border-lilac-light/60 hover:shadow-glow-lilac"
            >
              <CloseIcon />
            </button>

            <ProductImage product={product} className="aspect-square w-full sm:aspect-auto sm:h-full" />

            <div className="flex flex-col gap-4 p-6 sm:p-8">
              {product.tag ? (
                <span
                  className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 font-display text-xs font-semibold lowercase tracking-wide ${TAG_BADGE_CLASS[product.tag]}`}
                >
                  {(product.tag === 'edicao-limitada' || product.tag === 'pre-venda') && (
                    <HeartIcon size={12} tone="sakura" />
                  )}
                  {TAG_LABEL[product.tag]}
                </span>
              ) : null}

              <h2 id="product-modal-title" className="font-display text-2xl font-semibold leading-tight">
                {product.name}
              </h2>

              <p className="font-display text-xl font-semibold text-gradient">{formatPrice(product.price)}</p>

              <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>

              {product.variants?.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 font-display text-xs uppercase tracking-[0.2em] text-ink-soft">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.options.map((option) => (
                      <span
                        key={option}
                        className="rounded-full border border-lilac-light/30 bg-night-900/40 px-3 py-1 text-sm text-ink-soft"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <a
                href={whatsappLink(productWhatsappMessage(product.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-2 w-full justify-center"
              >
                Quero saber mais
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
