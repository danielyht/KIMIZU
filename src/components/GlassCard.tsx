import type { HTMLAttributes, Ref } from 'react'
import { StarSparkle } from './StarSparkle'

type Glow = 'lilac' | 'crystal' | 'sakura'
type Padding = 'none' | 'sm' | 'md' | 'lg'

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>
  /** Hover: sobe, a borda brilha mais e estrelinhas aparecem. */
  interactive?: boolean
  glow?: Glow
  padding?: Padding
}

const paddingClass: Record<Padding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-6 sm:p-10',
}

const hoverGlowClass: Record<Glow, string> = {
  lilac: 'hover:border-lilac-light/60 hover:shadow-glow-strong',
  crystal: 'hover:border-crystal-light/60 hover:shadow-glow-crystal',
  sakura: 'hover:border-sakura/60 hover:shadow-glow-sakura',
}

/** Cartão de vidro escuro com borda fina lilás/azul e brilho suave. */
export function GlassCard({
  interactive = false,
  glow = 'lilac',
  padding = 'md',
  className = '',
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={`glass group relative rounded-3xl ${paddingClass[padding]} ${
        interactive ? `transition duration-500 ease-out hover:-translate-y-1.5 ${hoverGlowClass[glow]}` : ''
      } ${className}`}
      {...rest}
    >
      {/* Reflexo de vidro no topo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-ink/40 to-transparent"
      />
      {interactive ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0">
          <StarSparkle
            size={14}
            tone="sakura"
            className="absolute -right-1.5 -top-1.5 scale-50 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
          <StarSparkle
            size={10}
            tone="crystal"
            delay={0.8}
            className="absolute -left-1 top-1/3 scale-50 opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100"
          />
          <StarSparkle
            size={12}
            tone="lilac"
            delay={1.6}
            className="absolute -bottom-1.5 right-1/4 scale-50 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        </span>
      ) : null}
      {children}
    </div>
  )
}
