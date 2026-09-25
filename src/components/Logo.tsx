import { color } from '../styles/tokens'
import { useSvgId } from '../lib/useSvgId'
import { StarSparkle } from './StarSparkle'

type LogoSize = 'sm' | 'md' | 'xl'

const textSize: Record<LogoSize, string> = {
  sm: 'text-2xl',
  md: 'text-4xl',
  xl: 'text-6xl sm:text-7xl lg:text-8xl',
}

const sparkleSize: Record<LogoSize, number> = { sm: 10, md: 14, xl: 26 }

type LogoProps = {
  size?: LogoSize
  /** Redemoinho de água cristalina sob o nome (para o hero). */
  swoosh?: boolean
  className?: string
}

function WaterSwoosh() {
  const id = useSvgId('swoosh')
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 60"
      className="pointer-events-none absolute -bottom-5 left-1/2 w-[115%] -translate-x-1/2 drop-shadow-glow-crystal"
      fill="none"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: color.crystalLight }} stopOpacity="0" />
          <stop offset="0.3" style={{ stopColor: color.crystalLight }} />
          <stop offset="0.7" style={{ stopColor: color.lilacLight }} />
          <stop offset="1" style={{ stopColor: color.sakuraLight }} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M10 40 C90 58 220 56 300 30 C340 17 370 12 392 14" stroke={`url(#${id})`} strokeWidth="4" strokeLinecap="round" />
      <path d="M60 50 C150 60 240 52 320 34" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

/** Logotipo KIMIZU: display inclinado, degradê azul-gelo → lilás e brilho externo. */
export function Logo({ size = 'md', swoosh = false, className = '' }: LogoProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className={`text-logo inline-block -skew-x-6 leading-none tracking-wide ${textSize[size]}`}>KIMIZU</span>
      <StarSparkle size={sparkleSize[size]} tone="sakura" className="absolute -right-2 -top-2 sm:-right-3" />
      {swoosh ? <WaterSwoosh /> : null}
    </span>
  )
}
