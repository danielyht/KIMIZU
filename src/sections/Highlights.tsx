import type { ReactElement } from 'react'
import { GlassCard } from '../components/GlassCard'
import { ChatHeartIcon, GiftBoxIcon, PawIcon, StarPendantIcon, type IconProps } from '../components/icons'

type Highlight = {
  Icon: (props: IconProps) => ReactElement
  title: string
  text: string
}

const HIGHLIGHTS: Highlight[] = [
  {
    Icon: PawIcon,
    title: 'Feito para fãs',
    text: 'Cada peça pensada para quem vive o fandom de corpo e alma.',
  },
  {
    Icon: StarPendantIcon,
    title: 'Itens selecionados a dedo',
    text: 'Escolhidos com carinho, prontos pro seu cantinho de fã.',
  },
  {
    Icon: GiftBoxIcon,
    title: 'Embalagem fofa e protegida',
    text: 'Seus tesourinhos chegam bem embrulhadinhos e seguros.',
  },
  {
    Icon: ChatHeartIcon,
    title: 'Atendimento pelo WhatsApp',
    text: 'Fala com a gente rapidinho, de fã para fã.',
  },
]

/** Mini cards com os diferenciais da loja. */
export function Highlights() {
  return (
    <section aria-label="Diferenciais da Kimizu" className="relative px-5 py-16">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map(({ Icon, title, text }) => (
          <GlassCard
            key={title}
            interactive
            padding="lg"
            className="flex flex-col items-center gap-3 text-center"
          >
            <Icon size={40} className="drop-shadow-glow-lilac" />
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            <p className="text-sm text-ink-soft">{text}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
