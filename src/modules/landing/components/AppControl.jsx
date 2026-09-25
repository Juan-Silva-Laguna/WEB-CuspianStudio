import { motion, useReducedMotion } from "motion/react";
import { QrCode, ClockCounterClockwise, CreditCard, ChartLine } from "@phosphor-icons/react";

const FEATURES = [
  { icon: QrCode, label: "Codigo QR personal para cada alumno" },
  { icon: ClockCounterClockwise, label: "Registro de asistencia automatico" },
  { icon: ChartLine, label: "Historial completo de clases" },
  { icon: CreditCard, label: "Pago digital, sin efectivo en recepcion" },
];

export function AppControl() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-surface px-6 py-28 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 md:grid-cols-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
            Control digital
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-bone md:text-5xl">
            Cada alumno, su propio codigo
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-smoke md:text-lg">
            Una experiencia de estudio profesional tambien se nota en la
            gestion: cada alumno entra, se registra y paga en segundos.
          </p>

          <ul className="mt-9 flex flex-col gap-4">
            {FEATURES.map((feature) => (
              <li key={feature.label} className="flex items-center gap-3">
                <feature.icon size={22} weight="light" className="shrink-0 text-ember" />
                <span className="text-sm font-medium text-bone sm:text-base">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-5 rounded-[2rem] border border-line bg-ink p-10"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,95,31,0.16),transparent_65%)]" />
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&color=F4F3EF&bgcolor=0A0A0B&data=https://cuspianstudio.com/reservar"
            alt="Codigo QR de acceso de Cuspian Studio"
            width={220}
            height={220}
            className="rounded-xl"
          />
          <div className="text-center">
            <p className="font-display text-lg font-semibold text-bone">
              Andrea Molina
            </p>
            <p className="text-sm text-smoke">Plan Full - 14 clases este mes</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
