import { motion, useReducedMotion } from "motion/react";
import { WhatsappLogo, ArrowRight } from "@phosphor-icons/react";

export function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-surface px-6 py-28 text-center md:px-10 md:py-36">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-semibold leading-[1.05] text-bone md:text-6xl"
        >
          Tu energia empieza aqui.
        </motion.h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#membresias"
            className="group flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-ink transition-transform active:scale-[0.98] hover:bg-ember-dim"
          >
            Reservar clase
            <ArrowRight
              size={18}
              weight="bold"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="https://wa.me/573000000000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-bone/25 px-7 py-3.5 text-sm font-semibold text-bone transition-colors hover:border-bone/60"
          >
            <WhatsappLogo size={18} weight="regular" />
            Escribir por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
