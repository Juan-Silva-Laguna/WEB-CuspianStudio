import { motion, useReducedMotion } from "motion/react";
import {
  Clock,
  EnvelopeSimple,
  MapPin,
  WhatsappLogo,
} from "@phosphor-icons/react";

const DETAILS = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Calle 20 # 36A-12, Neiva, Huila",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lunes a sábado, 6:00 a. m. a 9:00 p. m.",
  },
  {
    icon: EnvelopeSimple,
    label: "Correo",
    value: "hola@cuspianstudio.com",
  },
];

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contacto" className="bg-ink px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              transform: reduce ? "none" : "translateY(20px)",
            }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-bone md:text-6xl">
              Ven a sentirlo.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-smoke md:text-lg">
              Agenda tu primera clase o visita el estudio. Estamos listos para
              ayudarte a encontrar el plan ideal.
            </p>

            <div className="mt-10 grid gap-6">
              {DETAILS.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <detail.icon
                    size={24}
                    weight="light"
                    className="mt-0.5 shrink-0 text-ember"
                  />
                  <div>
                    <p className="text-sm font-semibold text-bone">
                      {detail.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-smoke">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noreferrer"
              className="button-press mt-10 inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-ink hover:bg-ember-dim"
            >
              <WhatsappLogo size={19} weight="bold" />
              Hablar por WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              transform: reduce ? "none" : "translateY(24px)",
            }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden rounded-2xl bg-surface"
          >
            <iframe
              title="Ubicación de Cuspian Studio"
              src="https://www.google.com/maps?q=Calle%2020%20%2336A-12%2C%20Neiva%2C%20Huila%2C%20Colombia&output=embed"
              className="h-[420px] w-full border-0 md:h-[560px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.app.goo.gl/N8A841JS7xtVZET76"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border-t border-line bg-surface px-6 py-4 text-sm font-semibold text-bone transition-colors hover:text-ember"
            >
              <MapPin size={18} weight="light" className="text-ember" />
              Ver en Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
