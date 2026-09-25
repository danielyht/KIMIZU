import type { CSSProperties } from 'react'
import { sparkleTones, type SparkleTone } from '../styles/tokens'
import { STAR_4_PATH } from './icons/shapes'
import { useSvgId } from '../lib/useSvgId'

const glowByTone: Record<SparkleTone, string> = {
  lilac: 'drop-shadow-glow-lilac',
  sakura: 'drop-shadow-glow-sakura',
  crystal: 'drop-shadow-glow-crystal',
  ink: 'drop-shadow-glow-lilac',
}

type StarSparkleProps = {
  size?: number
  tone?: SparkleTone
  /** Cintilar suave contínuo. */
  twinkle?: boolean
  /** Atraso da animação em segundos (para dessincronizar várias estrelas). */
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
}

/** Estrela de 4 pontas brilhante, marca registrada da Kimizu. Sempre decorativa. */
export function StarSparkle({
  size = 16,
  tone = 'lilac',
  twinkle = true,
  delay = 0,
  duration,
  className = '',
  style,
}: StarSparkleProps) {
  const id = useSvgId('sparkle')
  const [center, edge] = sparkleTones[tone]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none ${glowByTone[tone]} ${twinkle ? 'animate-twinkle' : ''} ${className}`}
      style={{
        animationDelay: `${delay}s`,
        ...(duration ? { animationDuration: `${duration}s` } : null),
        ...style,
      }}
    >
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.1" style={{ stopColor: center }} />
          <stop offset="1" style={{ stopColor: edge }} />
        </radialGradient>
      </defs>
      <path d={STAR_4_PATH} fill={`url(#${id})`} />
    </svg>
  )
}
