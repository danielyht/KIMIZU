import { color } from '../../styles/tokens'
import { useSvgId } from '../../lib/useSvgId'
import { IconBase, type IconProps } from './IconBase'
import { DROP_PATH, FALLING_PETAL_PATH, HEART_PATH, SAKURA_PETAL_PATH, STAR_4_PATH } from './shapes'

export type { IconProps } from './IconBase'

export type HeartTone = 'gradient' | 'crystal' | 'lilac' | 'sakura' | 'ink'

const heartStops: Record<HeartTone, [string, string, string]> = {
  gradient: [color.crystalLight, color.lilacLight, color.ink],
  crystal: [color.crystalLight, color.crystal, color.crystalLight],
  lilac: [color.lilacLight, color.lilac, color.lilacLight],
  sakura: [color.sakuraLight, color.sakura, color.lilacLight],
  ink: [color.ink, color.sakuraLight, color.ink],
}

export function HeartIcon({ tone = 'gradient', ...props }: IconProps & { tone?: HeartTone }) {
  const id = useSvgId('heart')
  const [a, b, c] = heartStops[tone]
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: a }} />
          <stop offset="0.55" style={{ stopColor: b }} />
          <stop offset="1" style={{ stopColor: c }} />
        </linearGradient>
      </defs>
      <path d={HEART_PATH} fill={`url(#${id})`} />
      <ellipse cx="7.4" cy="8.2" rx="1.8" ry="1.1" transform="rotate(-35 7.4 8.2)" style={{ fill: color.ink }} opacity="0.7" />
    </IconBase>
  )
}

export function PawIcon(props: IconProps) {
  const id = useSvgId('paw')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: color.lilacLight }} />
          <stop offset="1" style={{ stopColor: color.lilac }} />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <ellipse cx="12" cy="15.6" rx="5.2" ry="4.3" />
        <circle cx="5.8" cy="9.8" r="2.1" />
        <circle cx="9.5" cy="6.1" r="2.2" />
        <circle cx="14.5" cy="6.1" r="2.2" />
        <circle cx="18.2" cy="9.8" r="2.1" />
      </g>
      <ellipse cx="12" cy="15.9" rx="2.6" ry="2" style={{ fill: color.sakuraLight }} opacity="0.55" />
    </IconBase>
  )
}

export function FishIcon(props: IconProps) {
  const id = useSvgId('fish')
  return (
    <IconBase viewBox="0 0 32 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.crystalLight }} />
          <stop offset="1" style={{ stopColor: color.crystal }} />
        </linearGradient>
      </defs>
      <path d="M21 12 L29.5 5.5 C28.3 9.8 28.3 14.2 29.5 18.5 Z" fill={`url(#${id})`} opacity="0.85" />
      <path d="M2.5 12 C6.5 4.5 16 3.8 22.5 12 C16 20.2 6.5 19.5 2.5 12 Z" fill={`url(#${id})`} />
      <path d="M13 7.8 C14.8 10.4 14.8 13.6 13 16.2" strokeWidth="1.3" strokeLinecap="round" style={{ stroke: color.ink }} opacity="0.55" />
      <circle cx="7.6" cy="10.8" r="1.4" style={{ fill: color.night950 }} />
      <circle cx="7.1" cy="10.3" r="0.45" style={{ fill: color.ink }} />
    </IconBase>
  )
}

export function StarPendantIcon(props: IconProps) {
  const id = useSvgId('pendant')
  return (
    <IconBase viewBox="0 0 24 32" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.ink }} />
          <stop offset="0.35" style={{ stopColor: color.crystalLight }} />
          <stop offset="1" style={{ stopColor: color.crystal }} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="2.6" r="1.8" strokeWidth="1.2" style={{ stroke: color.inkSoft }} />
      <path d="M12 4.4 V8.5" strokeWidth="1.2" style={{ stroke: color.inkSoft }} />
      <g transform="translate(1.5 8.5) scale(0.875)">
        <path d={STAR_4_PATH} fill={`url(#${id})`} />
        <path d="M12 2 V22 M2 12 H22" strokeWidth="0.6" style={{ stroke: color.ink }} opacity="0.6" />
      </g>
    </IconBase>
  )
}

export function DropIcon(props: IconProps) {
  const id = useSvgId('drop')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" style={{ stopColor: color.crystalLight }} stopOpacity="0.95" />
          <stop offset="1" style={{ stopColor: color.crystal }} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d={DROP_PATH} fill={`url(#${id})`} strokeWidth="0.8" style={{ stroke: color.crystalLight }} strokeOpacity="0.8" />
      <ellipse cx="9.4" cy="14" rx="1.3" ry="2.4" transform="rotate(20 9.4 14)" style={{ fill: color.ink }} opacity="0.75" />
    </IconBase>
  )
}

export function SakuraIcon(props: IconProps) {
  const id = useSvgId('sakura')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.5" r="0.55">
          <stop offset="0.15" style={{ stopColor: color.sakuraLight }} />
          <stop offset="1" style={{ stopColor: color.sakura }} />
        </radialGradient>
      </defs>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path key={angle} d={SAKURA_PETAL_PATH} transform={`rotate(${angle} 12 12)`} fill={`url(#${id})`} />
      ))}
      <circle cx="12" cy="12" r="1.7" style={{ fill: color.lilac }} />
      <circle cx="12" cy="12" r="0.8" style={{ fill: color.ink }} />
    </IconBase>
  )
}

export function PetalIcon(props: IconProps) {
  const id = useSvgId('petal')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.sakuraLight }} />
          <stop offset="1" style={{ stopColor: color.lilacLight }} />
        </linearGradient>
      </defs>
      <path d={FALLING_PETAL_PATH} fill={`url(#${id})`} />
      <path d="M12 5 C11 10 11 15 12 19" strokeWidth="0.7" style={{ stroke: color.ink }} opacity="0.4" />
    </IconBase>
  )
}

export function LightstickIcon(props: IconProps) {
  const id = useSvgId('lightstick')
  return (
    <IconBase viewBox="0 0 24 32" {...props}>
      <defs>
        <radialGradient id={id} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" style={{ stopColor: color.ink }} />
          <stop offset="0.45" style={{ stopColor: color.crystalLight }} />
          <stop offset="1" style={{ stopColor: color.lilac }} />
        </radialGradient>
      </defs>
      <circle cx="12" cy="10" r="8" fill={`url(#${id})`} />
      <g transform="translate(8 6) scale(0.333)">
        <path d={STAR_4_PATH} style={{ fill: color.ink }} />
      </g>
      <rect x="8.5" y="16.8" width="7" height="3" rx="1.5" style={{ fill: color.lilacLight }} />
      <rect x="10" y="19" width="4" height="11.5" rx="2" strokeWidth="0.8" style={{ fill: color.night800, stroke: color.lilacLight }} />
    </IconBase>
  )
}

export function HeadphonesIcon(props: IconProps) {
  const id = useSvgId('phones')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.crystalLight }} />
          <stop offset="1" style={{ stopColor: color.lilac }} />
        </linearGradient>
      </defs>
      <path d="M4 15 V12 A8 8 0 0 1 20 12 V15" strokeWidth="2" strokeLinecap="round" style={{ stroke: color.lilacLight }} />
      <rect x="2.5" y="12.5" width="5" height="8" rx="2.5" fill={`url(#${id})`} />
      <rect x="16.5" y="12.5" width="5" height="8" rx="2.5" fill={`url(#${id})`} />
      <path d={HEART_PATH} transform="translate(9.6 13.4) scale(0.2)" style={{ fill: color.sakuraLight }} />
    </IconBase>
  )
}

export function PhotocardIcon(props: IconProps) {
  const id = useSvgId('photocard')
  return (
    <IconBase viewBox="0 0 24 30" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.sakuraLight }} />
          <stop offset="0.5" style={{ stopColor: color.lilacLight }} />
          <stop offset="1" style={{ stopColor: color.crystalLight }} />
        </linearGradient>
      </defs>
      <rect x="3" y="2" width="18" height="26" rx="3" strokeWidth="1" style={{ fill: color.night800, stroke: color.lilacLight }} />
      <rect x="5.5" y="4.5" width="13" height="15" rx="2" fill={`url(#${id})`} opacity="0.85" />
      <g transform="translate(9 9) scale(0.25)">
        <path d={STAR_4_PATH} style={{ fill: color.ink }} />
      </g>
      <path d={HEART_PATH} transform="translate(9.5 21.2) scale(0.21)" style={{ fill: color.sakura }} />
      <path d="M5.5 25.5 H18.5" strokeWidth="0.8" strokeLinecap="round" style={{ stroke: color.inkSoft }} opacity="0.5" />
    </IconBase>
  )
}

export function GiftBoxIcon(props: IconProps) {
  const id = useSvgId('gift')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.crystalLight }} />
          <stop offset="1" style={{ stopColor: color.lilac }} />
        </linearGradient>
      </defs>
      <rect x="3.5" y="10" width="17" height="10.5" rx="2.4" fill={`url(#${id})`} />
      <rect x="3.5" y="10" width="17" height="4" rx="1.6" style={{ fill: color.lilacLight }} opacity="0.9" />
      <rect x="10.6" y="10" width="2.8" height="10.5" style={{ fill: color.night800 }} opacity="0.45" />
      <path d="M12 10 C9 10 7 7.6 8.4 5.6 C9.6 4 12 5.4 12 10 Z" style={{ fill: color.sakuraLight }} />
      <path d="M12 10 C15 10 17 7.6 15.6 5.6 C14.4 4 12 5.4 12 10 Z" style={{ fill: color.sakura }} />
    </IconBase>
  )
}

export function ChatHeartIcon(props: IconProps) {
  const id = useSvgId('chat')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.crystalLight }} />
          <stop offset="1" style={{ stopColor: color.lilac }} />
        </linearGradient>
      </defs>
      <path
        d="M4 5.5 C4 4.1 5.1 3 6.5 3 H17.5 C18.9 3 20 4.1 20 5.5 V13.5 C20 14.9 18.9 16 17.5 16 H11 L6.5 19.6 V16 H6.5 C5.1 16 4 14.9 4 13.5 Z"
        fill={`url(#${id})`}
      />
      <path d={HEART_PATH} transform="translate(8.4 6.6) scale(0.31)" style={{ fill: color.ink }} />
    </IconBase>
  )
}

export function ShirtIcon(props: IconProps) {
  const id = useSvgId('shirt')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.lilacLight }} />
          <stop offset="1" style={{ stopColor: color.crystal }} />
        </linearGradient>
      </defs>
      <path
        d="M8.5 3 L4 6.8 L6.7 9.8 L8.2 8.4 V20.5 H15.8 V8.4 L17.3 9.8 L20 6.8 L15.5 3 C14.6 4.5 13.3 5.3 12 5.3 C10.7 5.3 9.4 4.5 8.5 3 Z"
        fill={`url(#${id})`}
      />
      <path d={HEART_PATH} transform="translate(9.6 10.4) scale(0.22)" style={{ fill: color.sakuraLight }} opacity="0.85" />
    </IconBase>
  )
}

export function PlushIcon(props: IconProps) {
  const id = useSvgId('plush')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: color.plumLight }} />
          <stop offset="1" style={{ stopColor: color.plum }} />
        </linearGradient>
      </defs>
      <circle cx="7.2" cy="6.4" r="3" fill={`url(#${id})`} />
      <circle cx="16.8" cy="6.4" r="3" fill={`url(#${id})`} />
      <ellipse cx="12" cy="14.5" rx="7.6" ry="6.8" fill={`url(#${id})`} />
      <ellipse cx="12" cy="15.4" rx="3.6" ry="3.2" style={{ fill: color.cream }} />
      <circle cx="9.4" cy="12.6" r="1" style={{ fill: color.night950 }} />
      <circle cx="14.6" cy="12.6" r="1" style={{ fill: color.night950 }} />
    </IconBase>
  )
}

export function AlbumIcon(props: IconProps) {
  const id = useSvgId('album')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.sakuraLight }} />
          <stop offset="1" style={{ stopColor: color.lilac }} />
        </linearGradient>
      </defs>
      <rect x="3.5" y="3" width="17" height="18" rx="2.4" strokeWidth="1" style={{ fill: color.night800, stroke: color.lilacLight }} />
      <rect x="3.5" y="3" width="4" height="18" rx="2" style={{ fill: color.lilac }} opacity="0.6" />
      <g transform="translate(10.3 9) scale(0.3)">
        <path d={STAR_4_PATH} fill={`url(#${id})`} />
      </g>
      <path d="M9.5 16.5 H17" strokeWidth="1" strokeLinecap="round" style={{ stroke: color.inkSoft }} opacity="0.55" />
    </IconBase>
  )
}

export function StationeryIcon(props: IconProps) {
  const id = useSvgId('tape')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.crystalLight }} />
          <stop offset="1" style={{ stopColor: color.sakura }} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9.2" fill={`url(#${id})`} />
      <circle cx="12" cy="12" r="3.6" style={{ fill: color.night900 }} />
      <g strokeWidth="1" strokeLinecap="round" style={{ stroke: color.ink }} opacity="0.5">
        <path d="M6 6 L8 8.5" />
        <path d="M18 6 L16 8.5" />
        <path d="M6 18 L8 15.5" />
        <path d="M18 18 L16 15.5" />
      </g>
    </IconBase>
  )
}

export function CollectibleIcon(props: IconProps) {
  const id = useSvgId('collect')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.ink }} />
          <stop offset="1" style={{ stopColor: color.crystalLight }} />
        </linearGradient>
      </defs>
      <path
        d="M6.5 9.5 C6.5 6 9 3.5 12 3.5 C15 3.5 17.5 6 17.5 9.5 V16 C17.5 17.9 15 19.3 12 19.3 C9 19.3 6.5 17.9 6.5 16 Z"
        strokeWidth="1"
        style={{ fill: color.night800, stroke: color.lilacLight }}
      />
      <rect x="6.5" y="9" width="11" height="1.6" style={{ fill: color.lilacLight }} opacity="0.5" />
      <g transform="translate(9 11.4) scale(0.25)">
        <path d={STAR_4_PATH} fill={`url(#${id})`} />
      </g>
      <ellipse cx="12" cy="20.4" rx="4.4" ry="1" style={{ fill: color.lilac }} opacity="0.4" />
    </IconBase>
  )
}

export function WhatsappIcon(props: IconProps) {
  const id = useSvgId('whatsapp')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.crystalLight }} />
          <stop offset="1" style={{ stopColor: color.lilac }} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9.5" fill={`url(#${id})`} />
      <path
        d="M7.7 15.9 L6.9 18.7 L9.8 17.9 C10.6 18.3 11.5 18.5 12.4 18.4 C15.6 18.1 17.9 15.3 17.6 12.1 C17.3 8.9 14.5 6.6 11.3 6.9 C8.1 7.2 5.8 10 6.1 13.2 C6.2 14.2 6.6 15.1 7.2 15.8 Z"
        strokeWidth="0"
        style={{ fill: color.night950 }}
        opacity="0.9"
      />
      <path
        d="M9.6 10.4 C9.4 9.9 9.1 9.9 8.9 9.9 C8.7 9.9 8.4 10 8.2 10.3 C8 10.6 7.6 11 7.6 11.7 C7.6 12.4 8 13.1 8.1 13.2 C8.2 13.4 9.1 14.9 10.6 15.5 C11.9 16 12.2 15.9 12.5 15.8 C12.8 15.7 13.4 15.3 13.6 14.9 C13.8 14.5 13.8 14.1 13.7 14 C13.6 13.9 13.5 13.9 13.3 13.8 C13.1 13.7 12.4 13.4 12.2 13.3 C12 13.2 11.9 13.2 11.7 13.4 C11.6 13.6 11.2 14 11.1 14.1 C11 14.2 10.9 14.2 10.7 14.1 C10.4 14 9.8 13.7 9.3 13.2 C8.9 12.8 8.6 12.3 8.5 12.1 C8.4 11.9 8.5 11.8 8.6 11.7 C8.7 11.6 8.9 11.4 9 11.2 C9.1 11 9.1 10.9 9 10.7 C8.9 10.5 9.7 10.8 9.6 10.4 Z"
        style={{ fill: color.ink }}
      />
    </IconBase>
  )
}

export function InstagramIcon(props: IconProps) {
  const id = useSvgId('instagram')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.sakuraLight }} />
          <stop offset="0.5" style={{ stopColor: color.lilac }} />
          <stop offset="1" style={{ stopColor: color.crystalLight }} />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="6" fill={`url(#${id})`} />
      <circle cx="12" cy="12" r="4.4" strokeWidth="1.6" style={{ stroke: color.ink }} />
      <circle cx="17" cy="7" r="1.3" style={{ fill: color.ink }} />
    </IconBase>
  )
}

export function MailIcon(props: IconProps) {
  const id = useSvgId('mail')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.crystalLight }} />
          <stop offset="1" style={{ stopColor: color.lilac }} />
        </linearGradient>
      </defs>
      <rect x="2.5" y="5" width="19" height="14" rx="3" fill={`url(#${id})`} />
      <path d="M3.5 6.5 L12 13 L20.5 6.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ stroke: color.night950 }} opacity="0.55" />
      <path d={HEART_PATH} transform="translate(9.6 13.5) scale(0.2)" style={{ fill: color.sakuraLight }} />
    </IconBase>
  )
}

export function ClockIcon(props: IconProps) {
  const id = useSvgId('clock')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color.lilacLight }} />
          <stop offset="1" style={{ stopColor: color.lilac }} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" fill={`url(#${id})`} />
      <circle cx="12" cy="12" r="9" fill="none" strokeWidth="1" style={{ stroke: color.ink }} opacity="0.3" />
      <path d="M12 7.2 V12 L15.4 14" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ stroke: color.night950 }} />
      <g transform="translate(10.3 1.6) scale(0.14)">
        <path d={STAR_4_PATH} style={{ fill: color.sakuraLight }} />
      </g>
    </IconBase>
  )
}

export function StarIcon(props: IconProps) {
  const id = useSvgId('star')
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: color.ink }} />
          <stop offset="1" style={{ stopColor: color.lilacLight }} />
        </radialGradient>
      </defs>
      <path d={STAR_4_PATH} fill={`url(#${id})`} />
    </IconBase>
  )
}
