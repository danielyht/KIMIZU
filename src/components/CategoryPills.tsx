import { CATEGORIES } from '../data/products'

type CategoryPillsProps = {
  selected: string
  onSelect: (id: string) => void
}

/** Filtro em pílulas com ícone: Todos + cada categoria de produto. */
export function CategoryPills({ selected, onSelect }: CategoryPillsProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar produtos por categoria"
      className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {CATEGORIES.map(({ id, label, Icon }) => {
        const isActive = selected === id
        return (
          <button
            key={id}
            type="button"
            aria-current={isActive ? 'true' : undefined}
            onClick={() => onSelect(id)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-display text-sm transition duration-300 ${
              isActive
                ? 'border-transparent bg-crystal-lilac text-white shadow-glow-crystal'
                : 'border-lilac-light/25 bg-night-900/40 text-ink-soft hover:border-lilac-light/50 hover:text-ink'
            }`}
          >
            <Icon size={18} className={isActive ? 'drop-shadow-glow-crystal' : ''} />
            {label}
          </button>
        )
      })}
    </div>
  )
}
