import { motion, useReducedMotion } from "motion/react";
import {
  Coffee,
  WifiHigh,
  Camera,
  TShirt,
  Medal,
  Target,
  MonitorPlay,
} from "@phosphor-icons/react";

const PERKS = [
  { icon: Coffee, label: "Cafe o agua de cortesia" },
  { icon: WifiHigh, label: "Wi-Fi en todo el estudio" },
  { icon: Camera, label: "Fotos profesionales de los alumnos" },
  { icon: TShirt, label: "Camiseta al cumplir permanencia" },
  { icon: Medal, label: "Medallas por asistencia" },
  { icon: Target, label: "Retos mensuales con premios" },
  { icon: MonitorPlay, label: "Tu nombre en pantalla al registrarte" },
];

export function Differentiators() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-ink px-6 py-28 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl font-semibold text-bone md:text-5xl">
            Los detalles que se quedan en la memoria
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-smoke md:text-lg">
            En muchos lugares solo ofrecen baile. Aqui construimos una
            experiencia completa alrededor de cada clase.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 divide-y divide-line border-t border-line sm:grid-cols-2 sm:divide-y-0 sm:border-t-0">
          {PERKS.map((perk, i) => (
            <motion.li
              key={perk.label}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-4 border-line py-5 sm:border-t sm:py-6 [&:nth-child(-n+2)]:sm:border-t-0"
            >
              <perk.icon size={24} weight="light" className="shrink-0 text-ember" />
              <span className="text-sm font-medium text-bone sm:text-base">
                {perk.label}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
