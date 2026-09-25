import { useMemo, useState, type FormEvent } from 'react'
import type { Product, ProductCategoryId, ProductTag, ProductVariantGroup } from '../data/products'
import { CATEGORIES, TAG_LABEL } from '../data/products'
import { slugify } from '../lib/productsApi'

const CATEGORY_OPTIONS = CATEGORIES.filter((c) => c.id !== 'todos') as {
  id: ProductCategoryId
  label: string
}[]

const TAG_OPTIONS = Object.keys(TAG_LABEL) as ProductTag[]

type ProductFormProps = {
  initial?: Product | null
  onSubmit: (product: Product) => Promise<void>
  onCancel: () => void
  /** Se true, o id fica travado (edição). */
  lockId?: boolean
}

type VariantDraft = { label: string; optionsText: string }

export function ProductForm({ initial, onSubmit, onCancel, lockId = false }: ProductFormProps) {
  const [manualId, setManualId] = useState(initial?.id ?? '')
  const [autoSlug, setAutoSlug] = useState(!initial)
  const [name, setName] = useState(initial?.name ?? '')
  const [category, setCategory] = useState<ProductCategoryId>(initial?.category ?? 'roupas')
  const [price, setPrice] = useState(initial?.price?.toString() ?? '')
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [image, setImage] = useState(initial?.image ?? '')
  const [tag, setTag] = useState<ProductTag | ''>(initial?.tag ?? '')
  const [variants, setVariants] = useState<VariantDraft[]>(
    () =>
      initial?.variants?.map((v) => ({ label: v.label, optionsText: v.options.join(', ') })) ?? [],
  )
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const id = lockId ? manualId : autoSlug ? slugify(name) : manualId

  const title = useMemo(() => (initial ? 'Editar produto' : 'Novo produto'), [initial])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    const parsedPrice = Number(price.replace(',', '.'))
    if (!id.trim() || !name.trim()) {
      setError('Nome e id são obrigatórios.')
      return
    }
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setError('Preço inválido.')
      return
    }

    const parsedVariants: ProductVariantGroup[] = variants
      .map((v) => ({
        label: v.label.trim(),
        options: v.optionsText
          .split(',')
          .map((o) => o.trim())
          .filter(Boolean),
      }))
      .filter((v) => v.label && v.options.length > 0)

    const product: Product = {
      id: id.trim(),
      name: name.trim(),
      category,
      price: parsedPrice,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      image: image.trim() || undefined,
      tag: tag || undefined,
      variants: parsedVariants.length ? parsedVariants : undefined,
    }

    setSaving(true)
    try {
      await onSubmit(product)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  const fieldClass =
    'w-full rounded-2xl border border-lilac-light/30 bg-night-900/60 px-4 py-3 text-ink outline-none focus:border-crystal-light'

  return (
    <form onSubmit={handleSubmit} className="glass space-y-5 rounded-3xl p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold">{title}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-ink-soft">Nome</span>
          <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Id (slug)</span>
          <input
            className={fieldClass}
            value={id}
            disabled={lockId}
            onChange={(e) => {
              setAutoSlug(false)
              setManualId(e.target.value)
            }}
            required
            pattern="[a-z0-9\-]+"
            title="Só letras minúsculas, números e hífen"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Categoria</span>
          <select
            className={fieldClass}
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategoryId)}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Preço (R$)</span>
          <input
            className={fieldClass}
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Etiqueta</span>
          <select className={fieldClass} value={tag} onChange={(e) => setTag(e.target.value as ProductTag | '')}>
            <option value="">Nenhuma</option>
            {TAG_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {TAG_LABEL[t]}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-ink-soft">URL da imagem (opcional)</span>
          <input
            className={fieldClass}
            type="url"
            placeholder="https://..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-ink-soft">Descrição curta</span>
          <input
            className={fieldClass}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
        </label>

        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-ink-soft">Descrição completa</span>
          <textarea
            className={`${fieldClass} min-h-28`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm text-ink-soft">Variações (tamanho, cor…)</p>
          <button
            type="button"
            className="btn-ghost px-4 py-2 text-sm"
            onClick={() => setVariants((v) => [...v, { label: '', optionsText: '' }])}
          >
            + Variação
          </button>
        </div>
        {variants.map((variant, index) => (
          <div
            key={index}
            className="grid gap-3 rounded-2xl border border-lilac-light/20 p-4 sm:grid-cols-[1fr_2fr_auto]"
          >
            <input
              className={fieldClass}
              placeholder="Rótulo (ex.: Tamanho)"
              value={variant.label}
              onChange={(e) =>
                setVariants((list) => list.map((item, i) => (i === index ? { ...item, label: e.target.value } : item)))
              }
            />
            <input
              className={fieldClass}
              placeholder="Opções separadas por vírgula (ex.: P, M, G)"
              value={variant.optionsText}
              onChange={(e) =>
                setVariants((list) =>
                  list.map((item, i) => (i === index ? { ...item, optionsText: e.target.value } : item)),
                )
              }
            />
            <button
              type="button"
              className="rounded-2xl border border-lilac-light/30 px-3 text-sm text-ink-soft hover:border-sakura/50"
              onClick={() => setVariants((list) => list.filter((_, i) => i !== index))}
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      {error ? <p className="text-sm text-sakura-light">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Salvando…' : 'Salvar'}
        </button>
        <button type="button" className="btn-ghost" onClick={onCancel} disabled={saving}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
