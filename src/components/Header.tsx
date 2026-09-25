import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Logo } from './Logo'

const NAV_ITEMS = [
  { label: 'Início', href: '#hero' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Sobre a loja', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-ink transition duration-300 ${
          open ? 'top-[7px] rotate-45' : ''
        }`}
      />
      <span
        className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-ink transition duration-300 ${
          open ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`absolute left-0 top-3.5 h-0.5 w-5 rounded-full bg-ink transition duration-300 ${
          open ? 'top-[7px] -rotate-45' : ''
        }`}
      />
    </span>
  )
}

/** Cabeçalho fixo translúcido: logo, navegação e menu hambúrguer no mobile. */
export function Header() {
  const [open, setOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-lilac-light/15 bg-night-950/70 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-[var(--header-height)] max-w-6xl items-center justify-between px-5">
          <a href="#hero" className="shrink-0" onClick={() => setOpen(false)} aria-label="Kimizu, ir para o início">
            <Logo size="sm" />
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-display text-sm tracking-wide text-ink-soft transition duration-300 hover:text-ink hover:drop-shadow-glow-lilac"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <span className="jp-signature hidden text-sm md:inline-block" aria-hidden="true">
            キミズ
          </span>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-lilac-light/30 bg-night-900/40 transition duration-300 hover:border-lilac-light/60 hover:shadow-glow-lilac md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass mx-4 mt-2 rounded-3xl p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4" aria-label="Navegação mobile">
              {NAV_ITEMS.map((item, i) => (
                <a
                  key={item.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-lg text-ink-soft transition hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 flex justify-center border-t border-lilac-light/15 pt-4">
              <span className="jp-signature text-base">キミズ</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
