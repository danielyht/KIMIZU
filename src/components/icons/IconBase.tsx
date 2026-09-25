import type { ReactNode, SVGProps } from 'react'

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  size?: number | string
  /** Texto acessível. Sem título, o ícone é tratado como decorativo. */
  title?: string
}

type IconBaseProps = IconProps & { viewBox: string; children: ReactNode }

export function IconBase({ size = 24, title, viewBox, children, ...rest }: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}
