import { Quotes, Star } from "@phosphor-icons/react";

const TESTIMONIALS_TOP = [
  {
    quote:
      "Llegué buscando ejercicio y encontré una comunidad que me hace querer volver cada semana.",
    name: "Laura Martinez",
    plan: "Plan Activo",
  },
  {
    quote:
      "Las clases tienen energía de show, pero los instructores siguen pendientes de tu técnica y progreso.",
    name: "Santiago Rojas",
    plan: "Plan Full",
  },
  {
    quote:
      "El espacio se siente cuidado. Desde que entras hasta que termina la clase, todo tiene intención.",
    name: "Valentina Gomez",
    plan: "Cuspian VIP",
  },
  {
    quote:
      "Jumping me devolvio las ganas de entrenar. Es intenso, divertido y nunca se siente repetitivo.",
    name: "Camila Torres",
    plan: "Plan Inicial",
  },
  {
    quote:
      "Vine por una clase suelta y me quedé por la comunidad. Cada instructor se aprende tu nombre.",
    name: "Juliana Perez",
    plan: "Clase Individual",
  },
  {
    quote:
      "Cambié tres gimnasios antes de llegar aquí. Ninguno tenía esta mezcla de exigencia y buena energía.",
    name: "Nicolas Vargas",
    plan: "Plan Activo",
  },
  {
    quote:
      "El plan fundador me dio el empujón que necesitaba. Tres meses después ya no falto a una clase.",
    name: "Manuela Cardenas",
    plan: "Plan Full",
  },
  {
    quote:
      "Bachata y funcional en el mismo estudio, con el mismo nivel de cuidado. Eso no se ve fácil.",
    name: "Sebastian Londoño",
    plan: "Plan Inicial",
  },
];

const TESTIMONIALS_BOTTOM = [
  {
    quote:
      "Empecé con la clase individual por curiosidad y en un mes ya tenía mensualidad. Se nota el nivel.",
    name: "Andres Sepulveda",
    plan: "Clase Individual",
  },
  {
    quote:
      "La coreografía para mi boda quedó tan bien que ahora vengo a las clases regulares del estudio.",
    name: "Daniela Ospina",
    plan: "Plan Activo",
  },
  {
    quote:
      "Cada Master Class trae algo nuevo. Nunca es la misma rutina y siempre salgo queriendo más.",
    name: "Mateo Restrepo",
    plan: "Plan Full",
  },
  {
    quote:
      "El seguimiento del plan Cuspian VIP con medición y alimentación cambió por completo mis resultados.",
    name: "Isabella Duque",
    plan: "Cuspian VIP",
  },
  {
    quote:
      "Traje a un amigo con el descuento y ahora entrenamos juntos cada semana. El ambiente engancha.",
    name: "Alejandro Ruiz",
    plan: "Plan Activo",
  },
  {
    quote:
      "Las fotos profesionales y las medallas por asistencia son detalles que no esperaba de un estudio de baile.",
    name: "Paula Jimenez",
    plan: "Plan Full",
  },
  {
    quote:
      "Entré con la matrícula gratis de lanzamiento y me quedé por la calidad de los profesores.",
    name: "David Zapata",
    plan: "Plan Inicial",
  },
  {
    quote:
      "Cada reto mensual me obliga a mejorar. Es la primera vez que un gimnasio me hace competir conmigo mismo.",
    name: "Sofia Herrera",
    plan: "Cuspian VIP",
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <article className="w-[82vw] max-w-md shrink-0 rounded-2xl bg-surface p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] md:w-[420px] md:p-8">
      <div className="flex items-center justify-between">
        <Quotes size={28} weight="fill" className="text-ember" />
        <div className="flex gap-1 text-ember" aria-label="5 de 5 estrellas">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={14} weight="fill" />
          ))}
        </div>
      </div>
      <blockquote className="mt-8">
        <p className="text-lg leading-relaxed text-bone">
          “{testimonial.quote}”
        </p>
        <footer className="mt-7">
          <p className="font-display font-semibold text-bone">
            {testimonial.name}
          </p>
          <p className="mt-1 text-sm text-smoke">{testimonial.plan}</p>
        </footer>
      </blockquote>
    </article>
  );
}

function TestimonialGroup({ items, keyPrefix, duplicate = false }) {
  return (
    <div
      className="testimonial-group"
      aria-hidden={duplicate ? "true" : undefined}
    >
      {items.map((testimonial) => (
        <TestimonialCard
          key={`${keyPrefix}-${duplicate ? "copy-" : ""}${testimonial.name}`}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

function MarqueeRow({ items, keyPrefix, reverse = false, duration = 64 }) {
  return (
    <div className="testimonial-viewport">
      <div
        className={`testimonial-marquee${reverse ? " testimonial-marquee--reverse" : ""}`}
        style={{ "--testimonial-duration": `${duration}s` }}
      >
        <TestimonialGroup items={items} keyPrefix={keyPrefix} />
        <TestimonialGroup
          items={items}
          keyPrefix={keyPrefix}
          duplicate
        />
      </div>
    </div>
  );
}


export function Testimonials() {
  return (
    <section
      id="testimonios"
      className="overflow-hidden bg-surface-2 py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-bone md:text-6xl">
          La energía se comparte.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-smoke md:text-lg">
          Personas reales que encontraron una forma distinta de entrenar,
          bailar y avanzar.
        </p>
      </div>

      <div className="mt-14 space-y-5 md:space-y-6">
        <MarqueeRow items={TESTIMONIALS_TOP} keyPrefix="top" duration={64} />
        <MarqueeRow
          items={TESTIMONIALS_BOTTOM}
          keyPrefix="bottom"
          reverse
          duration={72}
        />
      </div>
    </section>
  );
}
