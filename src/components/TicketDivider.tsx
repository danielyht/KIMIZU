import { Fragment } from 'react'
import { StarSparkle } from './StarSparkle'

const DEFAULT_ITEMS = [
  'pequenos momentos, grandes sonhos',
  'fileira K · assento do seu bias',
  'cada photocard é um tesouro',
  'comeback night',
  'feito com carinho',
]

type TicketDividerProps = {
  items?: string[]
  /** Texto rolando bem devagar. Fica parado com prefers-reduced-motion. */
  animated?: boolean
  className?: string
}

function Notch({ side }: { side: 'left' | 'right' }) {
  return (
    <span
      className={`absolute top-1/2 z-10 h-6 w-6 -translate-y-1/2 rounded-full border border-lilac-light/30 bg-night-950 ${
        side === 'left' ? '-left-3' : '-right-3'
      }`}
    />
  )
}

function TicketItems({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <Fragment key={item}>
          <span className="whitespace-nowrap px-5 font-display text-sm tracking-[0.2em] text-ink-soft lowercase">
            {item}
          </span>
          <StarSparkle size={10} tone="sakura" twinkle={false} />
        </Fragment>
      ))}
    </div>
  )
}

/** Faixa decorativa estilo ingresso de show / fita de fã, entre seções. */
export function TicketDivider({ items = DEFAULT_ITEMS, animated = true, className = '' }: TicketDividerProps) {
  return (
    <div aria-hidden="true" className={`mx-auto w-full max-w-6xl px-5 py-6 ${className}`}>
      <div className="glass relative flex items-stretch rounded-2xl border-lilac-light/40">
        <Notch side="left" />
        <Notch side="right" />

        <div className="hidden shrink-0 flex-col items-center justify-center border-r border-dashed border-lilac-light/40 px-6 py-3 sm:flex">
          <span className="font-logo text-lg leading-none text-gradient">K</span>
          <span className="mt-1 text-[10px] tracking-[0.3em] text-ink-soft uppercase">entrada</span>
        </div>

        <div className="relative flex-1 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className={`flex w-max ${animated ? 'animate-marquee' : ''}`}>
            <TicketItems items={items} />
            <TicketItems items={items} />
          </div>
        </div>

        <div className="hidden shrink-0 items-center border-l border-dashed border-lilac-light/40 px-6 sm:flex">
          <span className="jp-signature text-sm">キミズ</span>
        </div>
      </div>
    </div>
  )
}
