import { WorksWheel } from "@/shared/ui/works-wheel";

const IMAGE = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

const DISCIPLINES = [
  {
    title: "Jumping fitness",
    image: IMAGE("photo-1518611012118-696072aa579a"),
    href: "#membresias",
  },
  {
    title: "Dance fitness",
    image: IMAGE("photo-1504609813442-a8924e83f76e"),
    href: "#membresias",
  },
  {
    title: "Salsa",
    image: IMAGE("photo-1547153760-18fc86324498"),
    href: "#membresias",
  },
  {
    title: "Bachata",
    image: IMAGE("photo-1508700115892-45ecd05ae2ad"),
    href: "#membresias",
  },
  {
    title: "Funcional",
    image: IMAGE("photo-1538805060514-97d9cc17730c"),
    href: "#membresias",
  },
  {
    title: "Yoga",
    image: IMAGE("photo-1544367567-0f2fcb009e0b"),
    href: "#membresias",
  },
  {
    title: "Pilates",
    image: IMAGE("photo-1517836357463-d25dfeac3438"),
    href: "#membresias",
  },
  {
    title: "Bienestar",
    image: IMAGE("photo-1571019613454-1cb2f99b2d8b"),
    href: "#membresias",
  },
  {
    title: "Master class",
    image: IMAGE("photo-1524594152303-9fd13543fe6e"),
    href: "#eventos",
  },
  {
    title: "Eventos",
    image: IMAGE("photo-1505236858219-8359eb29e329"),
    href: "#eventos",
  },
];

export function WorksWheelSection() {
  return (
    <WorksWheel
      id="programas"
      items={DISCIPLINES}
      label="Tu movimiento"
      action="Ver plan"
      className="min-h-[620px] border-y border-line"
    />
  );
}
