import { color } from '../styles/tokens'
import { HeadphonesIcon, HeartIcon, LightstickIcon, PhotocardIcon } from './icons'
import { StarSparkle } from './StarSparkle'

export type MascotExpression = 'feliz' | 'piscando' | 'fofo' | 'dormindo'
export type MascotAccessory = 'lightstick' | 'fone' | 'photocards' | 'coracoes'
type MascotSize = 'sm' | 'md' | 'lg' | 'xl'

type MascotSlotProps = {
  /** Caminho da ilustração. Sem imagem, mostra o placeholder. */
  image?: string
  alt?: string
  expression?: MascotExpression
  size?: MascotSize
  /** Detalhes de fã ao redor da lontrinha. */
  accessories?: MascotAccessory[]
  /** Legenda delicada abaixo, como na folha de referência. */
  caption?: string
  className?: string
}

const sizeClass: Record<MascotSize, string> = {
  sm: 'w-28',
  md: 'w-44',
  lg: 'w-60 sm:w-72',
  xl: 'w-72 sm:w-80 lg:w-96',
}

const expressionLabel: Record<MascotExpression, string> = {
  feliz: 'feliz',
  piscando: 'piscando',
  fofo: 'fofo',
  dormindo: 'dormindo',
}

const defaultAlt: Record<MascotExpression, string> = {
  feliz: 'Kimizu, a lontrinha mascote, sorrindo feliz',
  piscando: 'Kimizu, a lontrinha mascote, piscando um olho',
  fofo: 'Kimizu, a lontrinha mascote, com carinha fofa',
  dormindo: 'Kimizu, a lontrinha mascote, dormindo toda enroladinha',
}

/** Carinha kawaii simples, só para indicar a expressão no placeholder. */
function PlaceholderFace({ expression }: { expression: MascotExpression }) {
  const closedEye = (cx: number) => `M ${cx - 5} 22 Q ${cx} 16 ${cx + 5} 22`
  const sleepyEye = (cx: number) => `M ${cx - 5} 21 Q ${cx} 25 ${cx + 5} 21`

  const openEye = (cx: number) => (
    <g>
      <ellipse cx={cx} cy="20" rx="4.5" ry="5.5" style={{ fill: color.night950 }} />
      <ellipse cx={cx} cy="21" rx="3" ry="3.6" style={{ fill: color.lilac }} opacity="0.8" />
      <circle cx={cx - 1.4} cy="17.8" r="1.6" style={{ fill: color.ink }} />
    </g>
  )

  const eyeStroke = { stroke: color.night950 }

  return (
    <svg viewBox="0 0 60 40" className="w-1/3" aria-hidden="true" focusable="false">
      {expression === 'feliz' && (
        <>
          <path d={closedEye(18)} strokeWidth="2.5" strokeLinecap="round" fill="none" style={eyeStroke} />
          <path d={closedEye(42)} strokeWidth="2.5" strokeLinecap="round" fill="none" style={eyeStroke} />
        </>
      )}
      {expression === 'piscando' && (
        <>
          {openEye(18)}
          <path d={closedEye(42)} strokeWidth="2.5" strokeLinecap="round" fill="none" style={eyeStroke} />
        </>
      )}
      {expression === 'fofo' && (
        <>
          {openEye(18)}
          {openEye(42)}
        </>
      )}
      {expression === 'dormindo' && (
        <>
          <path d={sleepyEye(18)} strokeWidth="2.5" strokeLinecap="round" fill="none" style={eyeStroke} />
          <path d={sleepyEye(42)} strokeWidth="2.5" strokeLinecap="round" fill="none" style={eyeStroke} />
        </>
      )}
      <ellipse cx="30" cy="26" rx="3" ry="2.2" style={{ fill: color.night950 }} />
      <path
        d={expression === 'dormindo' ? 'M 26 32 Q 30 34 34 32' : 'M 25 30 Q 30 37 35 30'}
        strokeWidth="2"
        strokeLinecap="round"
        style={{ ...eyeStroke, fill: expression === 'dormindo' ? 'none' : color.sakura }}
      />
      <ellipse cx="9" cy="29" rx="4" ry="2.4" style={{ fill: color.sakura }} opacity="0.55" />
      <ellipse cx="51" cy="29" rx="4" ry="2.4" style={{ fill: color.sakura }} opacity="0.55" />
    </svg>
  )
}

function Accessories({ items }: { items: MascotAccessory[] }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      {items.includes('lightstick') && (
        <span className="absolute -right-[6%] top-[4%] rotate-[18deg]">
          <LightstickIcon size="3.2em" className="animate-float drop-shadow-glow-crystal" style={{ animationDelay: '-1s' }} />
        </span>
      )}
      {items.includes('fone') && (
        <span className="absolute -left-[6%] top-[8%] -rotate-12">
          <HeadphonesIcon size="2.6em" className="animate-float drop-shadow-glow-lilac" style={{ animationDelay: '-3s' }} />
        </span>
      )}
      {items.includes('photocards') && (
        <span className="absolute -left-[8%] bottom-[6%]">
          <PhotocardIcon size="2.6em" className="absolute -rotate-12 drop-shadow-glow-sakura" />
          <PhotocardIcon size="2.6em" className="relative left-4 top-1 rotate-6 drop-shadow-glow-lilac" />
        </span>
      )}
      {items.includes('coracoes') && (
        <span className="absolute -right-[4%] bottom-[10%] flex flex-col items-center gap-1">
          <HeartIcon size="1.1em" tone="sakura" className="animate-float drop-shadow-glow-sakura" />
          <HeartIcon size="1.5em" className="-ml-5 animate-float drop-shadow-glow-lilac" style={{ animationDelay: '-2s' }} />
          <HeartIcon size="0.9em" tone="crystal" className="ml-4 animate-float drop-shadow-glow-crystal" style={{ animationDelay: '-4s' }} />
        </span>
      )}
    </span>
  )
}

/**
 * Espaço reservado para a lontrinha Kimizu.
 * Passe `image` com a ilustração final; enquanto isso, mostra um placeholder marcado.
 */
export function MascotSlot({
  image,
  alt,
  expression = 'feliz',
  size = 'md',
  accessories = [],
  caption,
  className = '',
}: MascotSlotProps) {
  const isSmall = size === 'sm'

  return (
    <figure className={`relative mx-auto flex flex-col items-center ${sizeClass[size]} ${className}`}>
      <div className={`relative aspect-square w-full ${isSmall ? 'text-xs' : 'text-sm sm:text-base'}`}>
        {/* Halo de luz atrás do mascote */}
        <span
          aria-hidden="true"
          className="absolute inset-[8%] rounded-full bg-gradient-to-br from-crystal/30 via-lilac/25 to-sakura/20 blur-2xl"
        />

        {image ? (
          <img
            src={image}
            alt={alt ?? defaultAlt[expression]}
            loading="lazy"
            decoding="async"
            className="relative h-full w-full object-contain drop-shadow-glow-lilac"
          />
        ) : (
          <div
            role="img"
            aria-label={`Espaço reservado para a ilustração da Kimizu (${expressionLabel[expression]})`}
            className="relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-[45%] border-2 border-dashed border-lilac-light/50 bg-gradient-to-br from-crystal/25 via-lilac/20 to-sakura/15 shadow-glow-lilac"
          >
            <StarSparkle size={isSmall ? 18 : 30} tone="ink" className="absolute left-1/2 top-[12%] -translate-x-1/2" />
            <PlaceholderFace expression={expression} />
            {!isSmall && (
              <span className="px-4 text-center font-display text-[0.7em] tracking-[0.25em] text-ink-soft lowercase">
                mascote · {expressionLabel[expression]}
              </span>
            )}
          </div>
        )}

        {expression === 'dormindo' && (
          <span
            aria-hidden="true"
            className="absolute right-[12%] top-[2%] animate-float font-display text-[1.1em] font-semibold tracking-widest text-lilac-light drop-shadow-glow-lilac"
          >
            z<span className="text-[0.8em]">z</span>
            <span className="text-[0.6em]">z</span>
          </span>
        )}

        {accessories.length > 0 && <Accessories items={accessories} />}
      </div>

      {caption ? (
        <figcaption className="mt-3 font-display text-sm tracking-[0.2em] text-ink-soft lowercase">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
