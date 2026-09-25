import { motion, useReducedMotion } from "motion/react";
import { Check, Sparkle } from "@phosphor-icons/react";

const PLANS = [
  {
    name: "Plan Inicial",
    price: "80.000",
    cadence: "8 clases al mes",
    detail: "Dos clases por semana. Ideal si apenas estas probando.",
    features: ["8 clases al mes", "Acceso a todos los programas", "Sin permanencia minima"],
  },
  {
    name: "Plan Activo",
    price: "100.000",
    cadence: "12 clases al mes",
    detail: "Tres clases por semana para tomar ritmo real.",
    features: ["12 clases al mes", "Acceso a todos los programas", "Prioridad en reservas"],
  },
  {
    name: "Plan Full",
    price: "150.000",
    cadence: "Clases ilimitadas",
    detail: "Para quien ya hizo de Cuspian parte de su rutina.",
    features: ["Clases ilimitadas", "1 invitado al mes", "Prioridad en reservas"],
  },
  {
    name: "Cuspian VIP",
    price: "170.000",
    cadence: "Clases ilimitadas",
    detail: "La experiencia completa, con seguimiento personalizado.",
    features: [
      "Clases ilimitadas + especiales",
      "3 invitados al mes",
      "Plan de alimentacion",
      "Medicion antropometrica",
    ],
    featured: true,
  },
];

const SPECIALS = [
  {
    name: "Master Class con invitados",
    price: "$20.000 - $30.000",
  },
  {
    name: "Taller de salsa o bachata",
    price: "$30.000 - $50.000 por taller",
  },
  {
    name: "Coreografia para bodas",
    price: "Desde $300.000",
  },
];

export function Membership() {
  const reduce = useReducedMotion();

  return (
    <section id="membresias" className="bg-ink px-6 py-28 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-2xl font-display text-4xl font-semibold text-bone md:text-5xl">
          Una membresia para cada ritmo
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-smoke md:text-lg">
          Sin letra pequena. Cambia o cancela cuando quieras.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col rounded-2xl border p-7 ${
                plan.featured
                  ? "border-ember bg-surface-2 lg:-translate-y-4 lg:shadow-[0_20px_60px_rgba(255,95,31,0.18)]"
                  : "border-line bg-surface"
              }`}
            >
              {plan.featured && (
                <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-ember px-3 py-1 text-xs font-semibold text-ink">
                  <Sparkle size={14} weight="fill" />
                  Mas elegido
                </span>
              )}
              <p className="font-display text-lg font-semibold text-bone">
                {plan.name}
              </p>
              <p className="mt-1 text-sm text-smoke">{plan.cadence}</p>

              <p className="mt-6 font-display text-4xl font-bold text-bone">
                ${plan.price}
                <span className="ml-1 text-sm font-normal text-smoke">/mes</span>
              </p>

              <p className="mt-4 text-sm leading-relaxed text-smoke">
                {plan.detail}
              </p>

              <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-bone">
                    <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-ember" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition-transform active:scale-[0.98] ${
                  plan.featured
                    ? "bg-ember text-ink hover:bg-ember-dim"
                    : "border border-bone/25 text-bone hover:border-bone/60"
                }`}
              >
                Reservar clase
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-7 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-display text-lg font-semibold text-bone">
              Clase individual
            </p>
            <p className="mt-1 text-sm text-smoke">
              Para quien prefiere probar sin mensualidad.
            </p>
          </div>
          <p className="font-display text-2xl font-bold text-bone">
            $15.000
          </p>
        </motion.div>

        <div className="mt-16 border-t border-line pt-10">
          <p className="font-display text-xl font-semibold text-bone">
            Clases especiales
          </p>
          <ul className="mt-6 divide-y divide-line">
            {SPECIALS.map((special) => (
              <li
                key={special.name}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm font-medium text-bone">
                  {special.name}
                </span>
                <span className="text-sm text-smoke">{special.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
