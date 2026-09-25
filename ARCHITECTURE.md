# Arquitectura del frontend

Module-Based Architecture. La organización principal es por **módulo de
negocio**, no por tipo técnico. El objetivo: que agregar un módulo nuevo
(auth, área de cliente, admin, coach...) no implique tocar una docena de
carpetas globales.

## Estructura actual

```
src/
├── app/                        Composición de la aplicación
│   ├── App.jsx                 Raíz: envuelve providers + módulo activo
│   └── providers/               Contextos que envuelven TODA la app
│       ├── useSmoothScroll.jsx  Lenis + GSAP ScrollTrigger, scroll lock
│       └── VideoScrollBackground.jsx  Video de fondo controlado por scroll
│
├── modules/
│   └── landing/                 Único módulo de negocio existente hoy
│       ├── components/          Secciones de la landing (About, Nav, ...)
│       ├── pages/LandingPage.jsx  Composición de la página completa
│       └── index.ts             API pública del módulo
│
├── shared/                      Solo lo verdaderamente reutilizable
│   ├── ui/                      Primitivas de diseño agnósticas de negocio
│   │   ├── timeline.tsx         (usada por landing hoy, reutilizable)
│   │   └── works-wheel.tsx
│   ├── components/Logo.jsx      Marca, usada por Nav/Footer y por
│   │                            cualquier futuro layout (auth/admin/coach)
│   └── utils/cn.ts              Helper de clases Tailwind (shadcn `cn`)
│
├── index.css
└── main.jsx
```

`public/` sigue siendo la carpeta de assets estáticos de Vite (imágenes,
video). No existe `src/assets/` porque nada en `src/` importa un asset
local; crearla hoy sería una carpeta vacía sin propósito.

## Reglas de dependencia

```
app  →  modules  →  shared
```

- Un módulo importa la **API pública** de otro módulo (su `index.ts`), nunca
  archivos internos. Ejemplo correcto: `import { LandingPage } from
  "@/modules/landing"`.
- `shared/` no depende de ningún módulo. Debe poder usarse desde cualquiera.
- Un componente sólo va a `shared/` si **ya** lo consume o va a consumir
  más de un módulo (no "por si acaso").

## Alias

`@` → `src/` (configurado en `vite.config.js` y `tsconfig.json`). Usa
imports absolutos (`@/shared/...`, `@/app/...`, `@/modules/...`) al cruzar
una frontera de módulo/capa, y relativos dentro del mismo módulo.

## shadcn/ui

`components.json` fue actualizado para que `npx shadcn add <componente>`
siga funcionando con la nueva ubicación: coloca primitivas en `shared/ui`
y usa `@/shared/utils/cn` como helper de clases.

## Lo que todavía NO existe (a propósito)

El proyecto hoy es solo una landing page: sin autenticación, sin roles,
sin router, sin cliente HTTP. Siguiendo la regla de no sobrearquitecturar,
no se crearon carpetas vacías para esto. Cuando llegue el momento:

- **Routing** → `app/router/routes.tsx` (centraliza las rutas; hoy no hay
  ninguna que centralizar, es una landing de una sola página con anchors).
- **Autenticación** → `modules/auth/` (pages: Login/Register/ForgotPassword,
  components, hooks, services, schemas, types, `index.ts`).
- **Roles** → `modules/client/`, `modules/admin/`, `modules/coach/`, cada
  uno con la misma forma que `modules/auth/` y `modules/landing/`.
- **Guards** → `guards/AuthGuard`, `guards/GuestGuard`, `guards/RoleGuard`,
  `guards/PermissionGuard`. No mezclar autenticación (¿está logueado?) con
  autorización (¿tiene permiso?).
- **Layouts** → `layouts/GuestLayout`, `layouts/AppLayout`,
  `layouts/AdminLayout`, `layouts/CoachLayout`. Composición esperada:
  `Layout → Guard → Module → Page`.
- **Infraestructura HTTP** → `infrastructure/http/` (cliente Axios/fetch
  centralizado). Ningún módulo debería crear su propio cliente HTTP.
  Patrón esperado: `Module → Service/Repository → HTTP client → API`.
- **Storage / notifications** → `infrastructure/storage/`,
  `infrastructure/notifications/`, mismo principio.

Crea cada una de estas carpetas **cuando el primer archivo real que la
necesita exista**, no antes.
