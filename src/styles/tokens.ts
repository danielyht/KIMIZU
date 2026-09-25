/**
 * Tokens de cor para uso em SVG e estilos inline.
 * Os valores reais vivem em globals.css (:root).
 */
const rgb = (name: string, alpha?: number) =>
  alpha === undefined ? `rgb(var(--c-${name}))` : `rgb(var(--c-${name}) / ${alpha})`

export const color = {
  night950: rgb('night-950'),
  night900: rgb('night-900'),
  night800: rgb('night-800'),
  crystal: rgb('crystal'),
  crystalLight: rgb('crystal-light'),
  lilac: rgb('lilac'),
  lilacLight: rgb('lilac-light'),
  sakura: rgb('sakura'),
  sakuraLight: rgb('sakura-light'),
  plum: rgb('plum'),
  plumLight: rgb('plum-light'),
  cream: rgb('cream'),
  ink: rgb('ink'),
  inkSoft: rgb('ink-soft'),
} as const

export const alpha = rgb

export type SparkleTone = 'lilac' | 'sakura' | 'crystal' | 'ink'

export const sparkleTones: Record<SparkleTone, [string, string]> = {
  lilac: [color.ink, color.lilacLight],
  sakura: [color.ink, color.sakura],
  crystal: [color.ink, color.crystalLight],
  ink: [color.ink, color.lilacLight],
}
