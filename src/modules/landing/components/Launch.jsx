import { motion, useReducedMotion } from "motion/react";

const STATS = [
  {
    value: "50",
    label: "cupos",
    detail: "Matricula gratis para los primeros 50 alumnos inscritos.",
  },
  {
    value: "$120.000",
    label: "3 meses",
    detail: "Plan fundador ilimitado durante todo el primer trimestre.",
  },
  {
    value: "2x1",
    label: "en descuento",
    detail: "Trae un amigo y ambos reciben descuento en su plan.",
  },
];

export function Launch() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-ember px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl font-display text-4xl font-semibold text-ink md:text-5xl"
        >
          El primer mes se vive distinto
        </motion.h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-xl text-base text-ink/80 md:text-lg"
        >
          Estamos construyendo comunidad desde el dia uno con beneficios que
          no se repiten.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-ink/15 pt-10 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="font-display text-5xl font-bold text-ink md:text-6xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-ink/70">
                {stat.label}
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/80">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <a
          href="#contacto"
          className="mt-14 inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-bone transition-transform active:scale-[0.98] hover:bg-surface-2"
        >
          Reservar clase
        </a>
      </div>
    </section>
  );
}
