import { GlassCard } from '../components/GlassCard'
import { ClockIcon, InstagramIcon, MailIcon, WhatsappIcon } from '../components/icons'
import { MascotSlot } from '../components/MascotSlot'
import { StarSparkle } from '../components/StarSparkle'
import { generalWhatsappMessage, siteConfig, whatsappLink } from '../config'

/** Contato: WhatsApp, Instagram, e-mail, horário de atendimento e o mascote piscando. */
export function Contact() {
  return (
    <section id="contato" className="relative px-5 py-20">
      <div className="mx-auto max-w-4xl">
        <GlassCard padding="lg" glow="crystal" className="relative overflow-hidden">
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:text-left">
            <MascotSlot size="md" expression="piscando" className="shrink-0" />

            <div className="flex-1">
              <span className="jp-signature mb-3 inline-flex items-center justify-center gap-2 text-sm lg:justify-start">
                <StarSparkle size={14} tone="sakura" />
                fale com a gente
              </span>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Vamos conversar?</h2>
              <p className="mt-3 text-ink-soft">
                Não achou o que procura? Chame a gente que ajudamos a encontrar.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a
                  href={whatsappLink(generalWhatsappMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <WhatsappIcon size={18} />
                  WhatsApp
                </a>
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <InstagramIcon size={18} />
                  {siteConfig.instagramHandle}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="btn-ghost">
                  <MailIcon size={18} />
                  {siteConfig.email}
                </a>
              </div>

              <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-soft lg:justify-start">
                <ClockIcon size={18} />
                {siteConfig.businessHours}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
