import { motion, useReducedMotion } from "motion/react";
import {
  GraduationCap,
  Star,
  Confetti,
  Trophy,
  Cake,
} from "@phosphor-icons/react";

const EVENTS = [
  {
    icon: GraduationCap,
    title: "Master Class",
    detail:
      "Tecnica avanzada de la mano de invitados especializados, una vez al mes.",
    span: "md:col-span-2",
  },
  {
    icon: Star,
    title: "Invitado nacional",
    detail: "Un coach reconocido del pais dicta clase abierta.",
  },
  {
    icon: Confetti,
    title: "Fiesta tematica",
    detail: "Noche de baile libre con dress code sorpresa.",
  },
  {
    icon: Trophy,
    title: "Competencias",
    detail: "Retos entre alumnos con jueces invitados.",
  },
  {
    icon: Cake,
    title: "Cumpleanos del estudio",
    detail: "La celebracion anual de toda la comunidad Cuspian.",
  },
];

export function Events() {
  const reduce = useReducedMotion();

  return (
    <section id="eventos" className="bg-surface px-6 py-28 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
          Cada mes en el estudio
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold text-bone md:text-5xl">
          El calendario nunca se detiene
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col justify-between gap-8 rounded-2xl border border-line bg-ink p-7 ${
                event.span ?? ""
              }`}
            >
              <event.icon size={28} weight="light" className="text-ember" />
              <div>
                <p className="font-display text-xl font-semibold text-bone">
                  {event.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-smoke">
                  {event.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
