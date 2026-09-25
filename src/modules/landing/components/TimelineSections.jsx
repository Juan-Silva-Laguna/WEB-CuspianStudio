import Timeline from "@/shared/ui/timeline";

const IMAGE = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

const PROCESO_TOP = [
  {
    id: "proceso-01",
    year: "01",
    month: "Calentamiento",
    content:
      "Activacion cardiovascular y movilidad articular para preparar el cuerpo antes de la clase.",
  },
  {
    id: "proceso-02",
    year: "02",
    month: "Practica de Posturas",
    content:
      "Ajustamos tecnica y alineacion en cada movimiento, guiados uno a uno por el instructor.",
  },
  {
    id: "proceso-03",
    year: "03",
    month: "Correccion en Espejo",
    content:
      "Nos vemos, nos corregimos y perfeccionamos cada coreografia frente al espejo.",
  },
  {
    id: "proceso-04",
    year: "04",
    month: "Descanso Activo",
    content:
      "Pausas breves con respiracion e hidratacion para sostener la energia de principio a fin.",
  },
];

const PROCESO_BOTTOM = [
  {
    id: "proceso-05",
    year: "05",
    month: "Circuito de Fuerza",
    content:
      "Trabajo funcional con bandas, mancuernas y peso corporal para tonificar sin perder el ritmo.",
  },
  {
    id: "proceso-06",
    year: "06",
    month: "Recuperacion Guiada",
    content:
      "Estiramientos asistidos y liberacion miofascial para cerrar la sesion sin dolor al dia siguiente.",
  },
  {
    id: "proceso-07",
    year: "07",
    month: "Cierre en Comunidad",
    content:
      "Compartimos agua, cafe y la energia del grupo antes de salir de vuelta al mundo real.",
  },
];

export function DetrasDeEscena() {
  return (
    <section id="detras-de-escena" className="bg-ink">
      <Timeline
        title="Detras de Escena"
        periodLabel="El Proceso"
        imageUrl={IMAGE("photo-1571019613454-1cb2f99b2d8b")}
        imageAlt="Instructor corrigiendo la postura de un alumno frente al espejo del estudio"
        topJourneyData={PROCESO_TOP}
        bottomJourneyData={PROCESO_BOTTOM}
      />
    </section>
  );
}
