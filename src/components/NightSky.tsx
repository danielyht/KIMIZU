import { memo, useMemo } from 'react'
import { between, seededRandom } from '../lib/random'
import type { SparkleTone } from '../styles/tokens'
import { StarSparkle } from './StarSparkle'

const SPARKLE_TONES: SparkleTone[] = ['lilac', 'sakura', 'crystal', 'ink']

type NightSkyProps = {
  dots?: number
  sparkles?: number
  particles?: number
}

/** Fundo fixo: céu azul-noite com estrelinhas, brilhos de 4 pontas, partículas de luz e marca d'água キミズ. */
export const NightSky = memo(function NightSky({ dots = 40, sparkles = 7, particles = 4 }: NightSkyProps) {
  const layout = useMemo(() => {
    const rand = seededRandom(2024)
    return {
      dots: Array.from({ length: dots }, () => ({
        top: between(rand, 0, 100),
        left: between(rand, 0, 100),
        size: between(rand, 1, 2.4),
        opacity: between(rand, 0.2, 0.55),
      })),
      sparkles: Array.from({ length: sparkles }, (_, i) => ({
        top: between(rand, 3, 95),
        left: between(rand, 2, 97),
        size: between(rand, 6, 12),
        delay: between(rand, 0, 5),
        duration: between(rand, 3, 6),
        tone: SPARKLE_TONES[i % SPARKLE_TONES.length],
      })),
      particles: Array.from({ length: particles }, (_, i) => ({
        top: between(rand, 5, 95),
        left: between(rand, 2, 98),
        size: between(rand, 3, 7),
        delay: between(rand, 0, 9),
        duration: between(rand, 8, 14),
        crystal: i % 2 === 0,
      })),
    }
  }, [dots, sparkles, particles])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-night-sky">
      {/* Nebulosas suaves */}
      <div className="absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-crystal/10 blur-3xl" />
      <div className="absolute -right-32 top-[55%] h-[26rem] w-[26rem] rounded-full bg-lilac/10 blur-3xl" />
      <div className="absolute left-1/3 top-[-10rem] h-[22rem] w-[36rem] rounded-full bg-sakura/[0.06] blur-3xl" />

      {layout.dots.map((d, i) => (
        <span
          key={`dot-${i}`}
          className="absolute rounded-full bg-ink"
          style={{ top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size, opacity: d.opacity }}
        />
      ))}

      {layout.sparkles.map((s, i) => (
        <StarSparkle
          key={`sparkle-${i}`}
          tone={s.tone}
          size={s.size}
          delay={s.delay}
          duration={s.duration}
          className="absolute"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
        />
      ))}

      {layout.particles.map((p, i) => (
        <span
          key={`particle-${i}`}
          className={`absolute animate-drift rounded-full blur-[2px] opacity-50 ${p.crystal ? 'bg-crystal-light shadow-glow-crystal' : 'bg-lilac-light shadow-glow-lilac'}`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <span className="jp-signature absolute right-3 top-1/2 hidden -translate-y-1/2 select-none text-5xl text-lilac-light/[0.07] [writing-mode:vertical-rl] md:block lg:right-6 lg:text-6xl">
        キミズ
      </span>
    </div>
  )
})
