import { memo } from 'react'
import { color } from '../styles/tokens'
import { DropIcon } from './icons'
import { useSvgId } from '../lib/useSvgId'

const WIDTH = 1440
const HEIGHT = 120

/** Onda senoidal suave (curvas Q/T) que passa um pouco das bordas para a animação não mostrar falhas. */
function wavePath(baseY: number, amplitude: number, wavelength: number, phase: number, closed: boolean) {
  const start = -120 - phase
  let d = `M ${start} ${baseY} Q ${start + wavelength / 4} ${baseY - amplitude} ${start + wavelength / 2} ${baseY}`
  for (let x = start + wavelength; x - wavelength / 2 < WIDTH + 120; x += wavelength / 2) {
    d += ` T ${x} ${baseY}`
  }
  return closed ? `${d} V ${HEIGHT} H ${start} Z` : d
}

type WaterDividerProps = {
  /** Espelha verticalmente (onda para cima). */
  flip?: boolean
  /** Mostra gotinhas de água sobre a onda. */
  drops?: boolean
  className?: string
}

/** Divisor curvo de água cristalina azul brilhante entre seções. */
export const WaterDivider = memo(function WaterDivider({ flip = false, drops = true, className = '' }: WaterDividerProps) {
  const fillId = useSvgId('water-fill')
  const lineId = useSvgId('water-line')
  const glowId = useSvgId('water-glow')

  return (
    <div aria-hidden="true" className={`pointer-events-none relative w-full ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="block h-16 w-full [mask-image:linear-gradient(to_bottom,black_45%,transparent)] sm:h-20 lg:h-28"
        focusable="false"
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: color.crystal }} stopOpacity="0.28" />
            <stop offset="0.5" style={{ stopColor: color.lilac }} stopOpacity="0.2" />
            <stop offset="1" style={{ stopColor: color.crystal }} stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id={lineId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: color.crystalLight }} stopOpacity="0" />
            <stop offset="0.2" style={{ stopColor: color.crystalLight }} />
            <stop offset="0.55" style={{ stopColor: color.lilacLight }} />
            <stop offset="0.85" style={{ stopColor: color.crystalLight }} />
            <stop offset="1" style={{ stopColor: color.crystalLight }} stopOpacity="0" />
          </linearGradient>
          <filter id={glowId} x="-10%" y="-100%" width="120%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="animate-wave">
          <path d={wavePath(52, 26, 640, 90, true)} fill={`url(#${fillId})`} opacity="0.6" />
        </g>
        <g className="animate-wave" style={{ animationDelay: '-6s', animationDuration: '16s' }}>
          <path d={wavePath(62, 22, 480, 0, true)} fill={`url(#${fillId})`} />
        </g>
        <g className="animate-wave" style={{ animationDelay: '-6s', animationDuration: '16s' }}>
          <path
            d={wavePath(62, 22, 480, 0, false)}
            stroke={`url(#${lineId})`}
            strokeWidth="2.5"
            fill="none"
            filter={`url(#${glowId})`}
          />
        </g>
      </svg>

      {drops ? (
        <>
          <DropIcon size={14} className="absolute left-[12%] top-0 animate-float drop-shadow-glow-crystal" />
          <DropIcon
            size={10}
            className="absolute left-[58%] top-1 animate-float drop-shadow-glow-crystal"
            style={{ animationDelay: '-2s' }}
          />
          <DropIcon
            size={12}
            className="absolute right-[14%] top-0 animate-float drop-shadow-glow-crystal"
            style={{ animationDelay: '-4s' }}
          />
        </>
      ) : null}
    </div>
  )
})
