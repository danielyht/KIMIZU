import { motion } from 'framer-motion'
import { Logo } from '../components/Logo'
import { MascotSlot } from '../components/MascotSlot'
import { SakuraPetals } from '../components/SakuraPetals'
import { StarSparkle } from '../components/StarSparkle'

/** Halo discreto ao redor do mascote: um anel suave e uma estrela. */
function CrystalHalo() {
  return (
    <div aria-hidden="true" className="motion-hide pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="absolute aspect-square w-[118%] rounded-full border border-dashed border-crystal-light/20" />
      <StarSparkle size={14} tone="sakura" className="absolute right-[6%] top-[4%]" />
    </div>
  )
}

/** Hero: título KIMIZU, slogan e o mascote. */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-5 pb-20 pt-[calc(var(--header-height)+2.5rem)] sm:pt-[calc(var(--header-height)+4rem)]"
    >
      <SakuraPetals position="absolute" count={6} />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <span className="jp-signature mb-4 inline-block text-base">キミズ</span>
          <h1>
            <Logo size="xl" swoosh />
          </h1>
          <p className="slogan mt-8">pequenos momentos, grandes sonhos</p>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Tudo para o seu cantinho de fã: roupas, pelúcias, photocards e mais, com muito carinho.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href="#produtos" className="btn-primary">
              Ver produtos
            </a>
            <a href="#sobre" className="btn-ghost">
              Conhecer a loja
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative shrink-0"
        >
          <CrystalHalo />
          <MascotSlot size="xl" expression="feliz" className="relative z-10" />
        </motion.div>
      </div>
    </section>
  )
}
