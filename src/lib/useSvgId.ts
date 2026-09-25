import { useId } from 'react'

/** Id seguro para usar em url(#id) dentro de SVGs. */
export function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
}
