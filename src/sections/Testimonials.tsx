import { GlassCard } from '../components/GlassCard'
import { FishIcon } from '../components/icons'
import { StarSparkle } from '../components/StarSparkle'

type Testimonial = {
  quote: string
  name: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Meu quarto ficou dos sonhos depois da decoração do lightstick e dos pins novos!',
    name: 'Nina, fã de coração',
  },
  {
    quote: 'A embalagem chegou perfeita, toda protegida e com um bilhetinho fofo dentro.',
    name: 'Yuki, colecionadora de photocards',
  },
  {
    quote: 'Achei o photocard que eu procurava há meses. Chorei de felicidade, sério.',
    name: 'Bel, guardiã do fichário',
  },
]

/** Balãozinho de fala com peixinho, no estilo da referência. */
function TestimonialBubble({ quote, name }: Testimonial) {
  return (
    <GlassCard interactive padding="lg" glow="crystal" className="relative">
      <FishIcon size={30} className="mb-3 drop-shadow-glow-crystal" />
      <p className="text-ink-soft">&ldquo;{quote}&rdquo;</p>
      <p className="mt-4 font-display text-sm text-ink">{name}</p>
      <span
        aria-hidden="true"
        className="absolute -bottom-2.5 left-10 h-5 w-5 rotate-45 border-b border-r border-lilac-light/25 bg-night-900/70 backdrop-blur-xl"
      />
    </GlassCard>
  )
}

/** Depoimentos: 3 balões de fala com frases de fãs de exemplo. */
export function Testimonials() {
  return (
    <section aria-label="Depoimentos de fãs" className="relative px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="jp-signature mb-3 inline-flex items-center gap-2 text-sm">
            <StarSparkle size={14} tone="lilac" />
            depoimentos
          </span>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Pequenos momentos de quem já é da família
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialBubble key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
