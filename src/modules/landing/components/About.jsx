import { motion, useReducedMotion } from "motion/react";
import { Eye, Target, UsersThree } from "@phosphor-icons/react";

const PRINCIPLES = [
  {
    title: "Quiénes somos",
    text: "Un estudio de movimiento que une baile, entrenamiento y comunidad en una experiencia de alto nivel.",
    icon: UsersThree,
  },
  {
    title: "Nuestra misión",
    text: "Hacer que cada persona encuentre una forma de moverse, progresar y sentirse parte de algo.",
    icon: Target,
  },
  {
    title: "Nuestra visión",
    text: "Ser el estudio referente de la ciudad por su energía, servicio, tecnología y cultura de comunidad.",
    icon: Eye,
  },
];

export function About({ sectionRef }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="my-24 bg-ink px-6 py-28 sm:my-32 md:my-56 md:px-10 md:py-36 lg:my-80 xl:my-[600px]"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{
            opacity: 0,
            transform: reduce ? "none" : "translateY(24px)",
          }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl"
        >
          <img
            src="/brand/selfie-zone.png"
            alt="Interior de Cuspian Studio con iluminación naranja y zona de espejos"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 max-w-xs font-display text-2xl font-semibold text-bone md:bottom-8 md:left-8 md:text-3xl">
            Más que una clase. Un lugar al que quieres volver.
          </p>
        </motion.div>

        <div>
          <motion.h2
            initial={{
              opacity: 0,
              transform: reduce ? "none" : "translateY(20px)",
            }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-bone md:text-6xl"
          >
            Esto no es una academia de baile.
          </motion.h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-smoke md:text-lg">
            Cuspian es recepción, espejos, sonido, zona selfie, tienda y
            tecnología. Todo está pensado para que entrenar se sienta como una
            experiencia completa.
          </p>

          <div className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {PRINCIPLES.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{
                  opacity: 0,
                  transform: reduce ? "none" : "translateY(16px)",
                }}
                whileInView={{ opacity: 1, transform: "translateY(0)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <item.icon size={26} weight="light" className="text-ember" />
                <h3 className="mt-4 font-display text-lg font-semibold text-bone">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-smoke">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
