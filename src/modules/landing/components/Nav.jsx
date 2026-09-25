import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/shared/components/Logo";
import { useScrollLock } from "@/app/providers/useSmoothScroll";

const LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Programas", href: "#programas" },
  { label: "Planes", href: "#membresias" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  const releaseScrollLock = useScrollLock(open);

  function closeMenu() {
    // Release the scroll lock synchronously, in the same click that closes
    // the menu, so an in-page anchor link tapped from inside it can
    // actually scroll (see the comment on `useScrollLock` for why).
    releaseScrollLock();
    setOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
          scrolled
            ? "border-line bg-ink/90 backdrop-blur-md"
            : "border-bone/10 bg-ink"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <a href="#top" className="flex items-center gap-2.5 text-bone">
            <Logo className="h-8 w-8 shrink-0" />
            <span className="font-display text-sm font-semibold tracking-[0.08em]">
              CUSPIAN STUDIO
            </span>
          </a>

          <ul className="hidden items-center gap-5 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-smoke transition-colors hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-1 lg:flex">
            <button
              type="button"
              disabled
              title="Disponible proximamente"
              className="rounded-full px-4 py-2.5 text-sm font-semibold text-smoke disabled:cursor-not-allowed"
            >
              Iniciar sesión
            </button>
            <a
              href="#membresias"
              className="button-press rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ember-dim"
            >
              Registrarme
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="button-press grid min-h-11 min-w-11 place-items-center text-bone lg:hidden"
            aria-label="Abrir menu"
          >
            <List size={26} weight="regular" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              transform: reduce ? "none" : "translateY(-2%)",
            }}
            animate={{ opacity: 1, transform: "translateY(0)" }}
            exit={{
              opacity: 0,
              transform: reduce ? "none" : "translateY(-2%)",
            }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain bg-ink px-6 py-6 lg:hidden"
            data-scroll-lock-scope
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-bone">
                <Logo className="h-8 w-8" />
                <span className="font-display text-sm font-semibold tracking-[0.08em]">
                  CUSPIAN STUDIO
                </span>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                className="button-press grid min-h-11 min-w-11 place-items-center text-bone"
                aria-label="Cerrar menu"
              >
                <X size={26} />
              </button>
            </div>

            <ul className="mt-12 flex flex-col gap-6">
              {LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{
                    opacity: 0,
                    transform: reduce ? "none" : "translateY(12px)",
                  }}
                  animate={{ opacity: 1, transform: "translateY(0)" }}
                  transition={{
                    duration: 0.3,
                    delay: 0.04 + index * 0.045,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="font-display text-3xl font-semibold text-bone"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto grid gap-3">
              <button
                type="button"
                disabled
                title="Disponible proximamente"
                className="min-h-12 rounded-full border border-line px-6 text-sm font-semibold text-smoke disabled:cursor-not-allowed"
              >
                Iniciar sesión, próximamente
              </button>
              <a
                href="#membresias"
                onClick={closeMenu}
                className="button-press min-h-12 rounded-full bg-ember px-6 py-3.5 text-center text-sm font-semibold text-ink"
              >
                Registrarme
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
