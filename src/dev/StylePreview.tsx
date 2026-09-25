import type { ReactNode } from 'react'
import { GlassCard } from '../components/GlassCard'
import { HeartBullets, HeartRow } from '../components/HeartBullets'
import {
  DropIcon,
  FishIcon,
  HeadphonesIcon,
  HeartIcon,
  LightstickIcon,
  PawIcon,
  PetalIcon,
  PhotocardIcon,
  SakuraIcon,
  StarPendantIcon,
} from '../components/icons'
import { Logo } from '../components/Logo'
import { MascotSlot, type MascotExpression } from '../components/MascotSlot'
import { StarSparkle } from '../components/StarSparkle'
import { TicketDivider } from '../components/TicketDivider'
import { WaterDivider } from '../components/WaterDivider'

/** Página temporária da Fase 1 para validar tokens e decorações. Será substituída pelas seções reais. */

const swatches = [
  { name: 'night-950', className: 'bg-night-950' },
  { name: 'night-900', className: 'bg-night-900' },
  { name: 'night-800', className: 'bg-night-800' },
  { name: 'crystal', className: 'bg-crystal' },
  { name: 'crystal-light', className: 'bg-crystal-light' },
  { name: 'lilac', className: 'bg-lilac' },
  { name: 'lilac-light', className: 'bg-lilac-light' },
  { name: 'sakura', className: 'bg-sakura' },
  { name: 'sakura-light', className: 'bg-sakura-light' },
  { name: 'plum', className: 'bg-plum' },
  { name: 'plum-light', className: 'bg-plum-light' },
  { name: 'cream', className: 'bg-cream' },
  { name: 'ink', className: 'bg-ink' },
  { name: 'ink-soft', className: 'bg-ink-soft' },
]

const icons = [
  { name: 'patinha', Icon: PawIcon },
  { name: 'peixinho', Icon: FishIcon },
  { name: 'pingente', Icon: StarPendantIcon },
  { name: 'coração', Icon: HeartIcon },
  { name: 'gota', Icon: DropIcon },
  { name: 'sakura', Icon: SakuraIcon },
  { name: 'pétala', Icon: PetalIcon },
  { name: 'lightstick', Icon: LightstickIcon },
  { name: 'fone', Icon: HeadphonesIcon },
  { name: 'photocard', Icon: PhotocardIcon },
]

const expressions: MascotExpression[] = ['feliz', 'piscando', 'fofo', 'dormindo']

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold">
        <StarSparkle size={16} tone="sakura" />
        {title}
      </h2>
      {children}
    </section>
  )
}

export function StylePreview() {
  return (
    <main className="pb-24">
      <header className="flex flex-col items-center gap-6 px-5 pb-10 pt-20 text-center">
        <span className="jp-signature text-lg">キミズ</span>
        <Logo size="xl" swoosh />
        <p className="slogan mt-6">pequenos momentos, grandes sonhos</p>
        <p className="max-w-xl text-ink-soft">
          Fase 1 · guia de estilo com tokens, fundo estrelado, pétalas e componentes de decoração.
        </p>
      </header>

      <WaterDivider />

      <Block title="Paleta">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {swatches.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <span className={`h-16 w-full rounded-2xl border border-lilac-light/20 ${s.className}`} />
              <code className="text-xs text-ink-soft">{s.name}</code>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Tipografia e botões">
        <GlassCard padding="lg" className="space-y-5">
          <p className="font-display text-4xl font-semibold">Fredoka · títulos fofinhos</p>
          <p className="text-lg text-ink-soft">
            Quicksand no corpo do texto: tudo para o seu cantinho de fã, com muito carinho e delicadeza.
          </p>
          <p className="slogan">pequenos momentos, grandes sonhos</p>
          <div className="flex flex-wrap gap-4">
            <button type="button" className="btn-primary">
              Ver produtos
            </button>
            <button type="button" className="btn-ghost">
              Conhecer a loja
            </button>
          </div>
        </GlassCard>
      </Block>

      <Block title="Estrelinhas e ícones">
        <div className="mb-8 flex flex-wrap items-center gap-6">
          <StarSparkle size={12} tone="lilac" />
          <StarSparkle size={20} tone="sakura" delay={0.5} />
          <StarSparkle size={28} tone="crystal" delay={1} />
          <StarSparkle size={36} tone="ink" delay={1.5} />
        </div>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-10">
          {icons.map(({ name, Icon }) => (
            <div key={name} className="glass flex flex-col items-center gap-2 rounded-2xl p-4">
              <Icon size={34} className="drop-shadow-glow-lilac" />
              <span className="text-xs text-ink-soft">{name}</span>
            </div>
          ))}
        </div>
      </Block>

      <TicketDivider />

      <Block title="Cartões de vidro">
        <div className="grid gap-6 sm:grid-cols-3">
          <GlassCard interactive>
            <PawIcon size={36} className="mb-3 drop-shadow-glow-lilac" />
            <h3 className="text-lg font-semibold">Passe o mouse</h3>
            <p className="text-sm text-ink-soft">O cartão sobe, a borda brilha e aparecem estrelinhas.</p>
          </GlassCard>
          <GlassCard interactive glow="crystal">
            <FishIcon size={36} className="mb-3 drop-shadow-glow-crystal" />
            <h3 className="text-lg font-semibold">Brilho azul</h3>
            <p className="text-sm text-ink-soft">Variação com glow cristal.</p>
          </GlassCard>
          <GlassCard interactive glow="sakura">
            <SakuraIcon size={36} className="mb-3 drop-shadow-glow-sakura" />
            <h3 className="text-lg font-semibold">Brilho sakura</h3>
            <p className="text-sm text-ink-soft">Variação com glow rosa-lavanda.</p>
          </GlassCard>
        </div>
      </Block>

      <Block title="Corações">
        <GlassCard className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <HeartBullets items={['Carinho em cada detalhe', 'Cuidado com os itens', 'Comunidade de fãs']} />
          <HeartRow count={5} size={22} />
        </GlassCard>
      </Block>

      <WaterDivider flip />

      <Block title="Espaço do mascote">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {expressions.map((e) => (
            <MascotSlot key={e} expression={e} caption={e} />
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <MascotSlot size="lg" expression="feliz" accessories={['lightstick', 'fone', 'photocards', 'coracoes']} />
        </div>
      </Block>
    </main>
  )
}
