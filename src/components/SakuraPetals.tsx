import { memo, useMemo, type CSSProperties } from 'react'
import { between, seededRandom } from '../lib/random'
import { PetalIcon, SakuraIcon } from './icons'

type SakuraPetalsProps = {
  count?: number
  /** fixed: cobre a tela toda; absolute: fica dentro do pai (que precisa ser relative). */
  position?: 'fixed' | 'absolute'
  className?: string
}

/** Pétalas e florzinhas de cerejeira caindo bem devagar. Some com prefers-reduced-motion. */
export const SakuraPetals = memo(function SakuraPetals({
  count = 6,
  position = 'fixed',
  className = '',
}: SakuraPetalsProps) {
  const petals = useMemo(() => {
    const rand = seededRandom(77)
    return Array.from({ length: count }, (_, i) => {
      const duration = between(rand, 20, 36)
      return {
        left: between(rand, 0, 98),
        size: between(rand, 8, 14),
        duration,
        delay: -between(rand, 0, duration),
        sway: between(rand, -70, 70),
        opacity: between(rand, 0.18, 0.4),
        flower: i % 4 === 0,
      }
    })
  }, [count])

  return (
    <div
      aria-hidden="true"
      className={`motion-hide pointer-events-none inset-0 overflow-hidden ${position === 'fixed' ? 'fixed -z-10' : 'absolute'} ${className}`}
    >
      {petals.map((p, i) => {
        const Petal = p.flower ? SakuraIcon : PetalIcon
        return (
          <span
            key={i}
            className="absolute top-0 animate-petal-fall will-change-transform"
            style={
              {
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                '--petal-sway': `${p.sway}px`,
                '--petal-opacity': p.opacity,
              } as CSSProperties
            }
          >
            <Petal size={p.size} className="drop-shadow-glow-sakura" />
          </span>
        )
      })}
    </div>
  )
})
