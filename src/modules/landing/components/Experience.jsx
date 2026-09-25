import { motion, useReducedMotion } from "motion/react";
import { SpeakerHigh, Sparkle } from "@phosphor-icons/react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Experience({ sectionRef }) {
  const reduce = useReducedMotion();

  return (
    <section id="experiencia" ref={sectionRef} className="bg-ink px-6 py-28 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <h2 className="font-display text-4xl font-semibold text-bone md:text-5xl">
            Un espacio que se siente antes de bailar
          </h2>
          <p className="mt-4 text-base leading-relaxed text-smoke md:text-lg">
            Recepcion con logo iluminado, espejos de piso a techo, zona
            selfie y un sistema de sonido que marca cada coreografia.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
          <motion.figure
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="group relative col-span-1 row-span-2 aspect-[4/5] overflow-hidden rounded-2xl md:col-span-2 md:aspect-auto"
          >
            <img
              src="/gallery/selfie-zone-real.jpg"
              alt="Salto en minitrampolín reflejado en los espejos de piso a techo de Cuspian Studio"
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-xl font-semibold text-bone">
                Zona selfie
              </p>
              <p className="mt-1 text-sm text-smoke">
                Fotos profesionales listas para tus redes.
              </p>
            </figcaption>
          </motion.figure>

          <motion.figure
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="relative col-span-1 row-span-1 aspect-square overflow-hidden rounded-2xl bg-surface"
          >
            <img
              src="/gallery/brand-identity.jpg"
              alt="Instructor frente al mural de la marca Cuspian Studio en el estudio"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display text-sm font-semibold text-bone">
                Identidad de marca
              </p>
            </figcaption>
          </motion.figure>

          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="relative col-span-1 row-span-1 flex aspect-square flex-col justify-between overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,95,31,0.18),transparent_60%)] bg-surface p-5"
          >
            <SpeakerHigh size={28} weight="light" className="text-ember" />
            <p className="font-display text-sm font-semibold text-bone">
              Sonido inmersivo que se siente en el cuerpo
            </p>
          </motion.div>

          <motion.figure
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="relative col-span-1 row-span-1 aspect-square overflow-hidden rounded-2xl bg-surface md:col-span-2 md:aspect-auto"
          >
            <img
              src="/brand/merch.png"
              alt="Camisetas y botellas de la tienda deportiva de Cuspian Studio"
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-lg font-semibold text-bone">
                Tienda deportiva propia
              </p>
              <p className="mt-1 text-sm text-smoke">
                Uniforme y botella oficiales, siempre a la mano.
              </p>
            </figcaption>
          </motion.figure>
        </div>

        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-surface px-6 py-5"
        >
          <Sparkle size={20} weight="light" className="shrink-0 text-ember" />
          <p className="text-sm text-smoke">
            Recepcion con logo iluminado y espejos de piso a techo en cada
            salon, para que el espacio se sienta tan cuidado como la clase.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
