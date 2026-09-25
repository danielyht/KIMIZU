import { HeartBullets } from '../components/HeartBullets'
import { MascotSlot } from '../components/MascotSlot'
import { StarSparkle } from '../components/StarSparkle'

/** Sobre a loja: a história da lontrinha Kimizu, o significado do nome e os valores. */
export function About() {
  return (
    <section id="sobre" className="relative px-5 py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
        <MascotSlot
          size="lg"
          expression="dormindo"
          accessories={['photocards']}
          caption="descansando entre um comeback e outro"
          className="shrink-0"
        />

        <div className="max-w-xl text-center lg:text-left">
          <span className="jp-signature mb-3 inline-flex items-center justify-center gap-2 text-sm lg:justify-start">
            <StarSparkle size={14} tone="crystal" />
            sobre a loja
          </span>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            A lontrinha que guardava pequenos tesouros
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Era uma vez uma lontrinha fã de K-pop que guardava cada photocard, cada ingresso e cada lembrancinha de
            show como se fossem verdadeiros tesouros. De tanto colecionar pequenos momentos, ela decidiu abrir um
            cantinho só dela — a Kimizu — para que outros fãs também encontrassem os seus.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            O nome nasce da junção de <strong className="text-ink">"kimi"</strong> (você) com{' '}
            <strong className="text-ink">"mizu"</strong> (água): a água cristalina que reflete você e guarda cada
            lembrança boa, do primeiro comeback ao show mais esperado.
          </p>

          <HeartBullets
            className="mt-6"
            items={[
              'Carinho em cada detalhe, do embrulho ao "oi" no WhatsApp.',
              'Cuidado de verdade com cada item, como se fosse nosso.',
              'Comunidade: aqui todo fã tem seu cantinho e o seu bias.',
            ]}
          />
        </div>
      </div>
    </section>
  )
}
