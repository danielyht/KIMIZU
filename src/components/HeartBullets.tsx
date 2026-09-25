import type { ReactNode } from 'react'
import { HeartIcon, type HeartTone } from './icons'

type HeartBulletsProps = {
  items: ReactNode[]
  className?: string
}

/** Lista com coraçõezinhos em degradê (azul → lilás → branco) como marcadores. */
export function HeartBullets({ items, className = '' }: HeartBulletsProps) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-ink-soft">
          <HeartIcon size={16} className="mt-1 shrink-0 drop-shadow-glow-lilac" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const ROW_TONES: HeartTone[] = ['crystal', 'lilac', 'gradient', 'sakura', 'ink']

type HeartRowProps = {
  count?: number
  size?: number
  className?: string
}

/** Fileira de corações em degradê, como a coluna da referência. */
export function HeartRow({ count = 5, size = 14, className = '' }: HeartRowProps) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <HeartIcon key={i} size={size} tone={ROW_TONES[i % ROW_TONES.length]} className="drop-shadow-glow-lilac" />
      ))}
    </div>
  )
}
