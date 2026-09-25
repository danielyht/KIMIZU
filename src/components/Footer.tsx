import { generalWhatsappMessage, siteConfig, whatsappLink } from '../config'
import { HeartRow } from './HeartBullets'
import { InstagramIcon, MailIcon, WhatsappIcon } from './icons'
import { Logo } from './Logo'
import { MascotSlot } from './MascotSlot'

const FOOTER_LINKS = [
  { label: 'Início', href: '#hero' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Sobre a loja', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

/** Rodapé: logo, slogan, キミズ, links, ícones sociais e fileira de corações. */
export function Footer() {
  return (
    <footer className="relative border-t border-lilac-light/15 px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
          <Logo size="md" />
          <p className="slogan">{siteConfig.slogan}</p>
          <span className="jp-signature text-base">{siteConfig.nameJp}</span>
        </div>

        <MascotSlot size="sm" expression="feliz" className="mx-auto" />

        <nav className="flex flex-col items-center gap-2 sm:items-end" aria-label="Links do rodapé">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-ink-soft transition hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-5 border-t border-lilac-light/10 pt-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <a
            href={whatsappLink(generalWhatsappMessage())}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp da Kimizu"
            className="transition hover:drop-shadow-glow-crystal"
          >
            <WhatsappIcon size={26} />
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Kimizu"
            className="transition hover:drop-shadow-glow-lilac"
          >
            <InstagramIcon size={26} />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="E-mail da Kimizu"
            className="transition hover:drop-shadow-glow-crystal"
          >
            <MailIcon size={26} />
          </a>
        </div>

        <HeartRow count={5} size={14} />

        <p className="font-display text-sm text-ink-soft">feito com carinho ✦</p>
      </div>
    </footer>
  )
}
