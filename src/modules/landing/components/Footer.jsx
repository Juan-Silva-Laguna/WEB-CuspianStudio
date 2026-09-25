import { InstagramLogo, TiktokLogo, MapPin, Clock } from "@phosphor-icons/react";
import { Logo } from "@/shared/components/Logo";

const LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Programas", href: "#programas" },
  { label: "Planes", href: "#membresias" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 text-bone">
            <Logo className="h-8 w-8" />
            <span className="font-display text-sm font-semibold tracking-[0.08em]">
              CUSPIAN STUDIO
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-smoke">
            Muevete. Conecta. Evoluciona. Un estudio de movimiento para
            bailar, entrenar y crecer como comunidad.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Cuspian Studio"
              className="text-smoke transition-colors hover:text-bone"
            >
              <InstagramLogo size={22} weight="regular" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok de Cuspian Studio"
              className="text-smoke transition-colors hover:text-bone"
            >
              <TiktokLogo size={22} weight="regular" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-bone">Estudio</p>
          <ul className="mt-4 flex flex-col gap-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-smoke transition-colors hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-bone">Visitanos</p>
          <div className="mt-4 flex items-start gap-2.5">
            <MapPin size={20} weight="light" className="mt-0.5 shrink-0 text-ember" />
            <p className="text-sm text-smoke">
              Calle 20 # 36A-12, Neiva, Huila, Colombia
            </p>
          </div>
          <div className="mt-3 flex items-start gap-2.5">
            <Clock size={20} weight="light" className="mt-0.5 shrink-0 text-ember" />
            <p className="text-sm text-smoke">
              Lunes a sabado, 6:00 a. m. a 9:00 p. m.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1400px] border-t border-line pt-8">
        <p className="text-xs text-smoke">
          Cuspian Studio, {new Date().getFullYear()}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
