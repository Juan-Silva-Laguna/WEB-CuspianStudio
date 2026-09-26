import { createBrowserRouter, Navigate } from 'react-router-dom';

import { GuestGuard, RoleGuard } from '@/guards';

// Layouts
import LandingLayout from '@/layouts/LandingLayout';
import AdminLayout from '@/layouts/AdminLayout';
import TrainerLayout from '@/layouts/TrainerLayout';
import ClientLayout from '@/layouts/ClientLayout';

// Auth pages
import LoginPage from '@/modules/auth/pages/LoginPage';
import RegisterPage from '@/modules/auth/pages/RegisterPage';

// Admin pages
import AdminDashboard from '@/modules/admin/pages/AdminDashboard';
import UsuariosPage from '@/modules/admin/pages/UsuariosPage';
import EntrenadoresPage from '@/modules/admin/pages/EntrenadoresPage';
import SalasPage from '@/modules/admin/pages/SalasPage';
import ServiciosPage from '@/modules/admin/pages/ServiciosPage';
import PlanesPage from '@/modules/admin/pages/PlanesPage';
import HorariosPage from '@/modules/admin/pages/HorariosPage';
import ReservasPage from '@/modules/admin/pages/ReservasPage';
import SuscripcionesPage from '@/modules/admin/pages/SuscripcionesPage';
import PagosPage from '@/modules/admin/pages/PagosPage';
import GastosPage from '@/modules/admin/pages/GastosPage';
import ReportesPage from '@/modules/admin/pages/ReportesPage';

// Trainer pages
import TrainerHorariosPage from '@/modules/trainer/pages/TrainerHorariosPage';
import TrainerReservasPage from '@/modules/trainer/pages/TrainerReservasPage';
import TrainerAcumuladoPage from '@/modules/trainer/pages/TrainerAcumuladoPage';
import TrainerPagosPage from '@/modules/trainer/pages/TrainerPagosPage';

// Client pages
import ClientSuscripcionPage from '@/modules/client/pages/ClientSuscripcionPage';
import ClientPlanesPage from '@/modules/client/pages/ClientPlanesPage';
import ClientHorariosPage from '@/modules/client/pages/ClientHorariosPage';
import ClientReservasPage from '@/modules/client/pages/ClientReservasPage';
import ClientPagosPage from '@/modules/client/pages/ClientPagosPage';

// Landing
// (LandingLayout wraps LandingPage with its scroll/video providers)

// Error pages
import { NotFoundPage, ForbiddenPage } from '@/modules/error/pages';

export const router = createBrowserRouter([
  // Landing (public)
  { path: '/', element: <LandingLayout /> },

  // Guest-only routes
  {
    element: <GuestGuard />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },

  // Admin routes
  {
    element: <RoleGuard roles={['admin']} />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'usuarios', element: <UsuariosPage /> },
          { path: 'entrenadores', element: <EntrenadoresPage /> },
          { path: 'salas', element: <SalasPage /> },
          { path: 'servicios', element: <ServiciosPage /> },
          { path: 'planes', element: <PlanesPage /> },
          { path: 'horarios', element: <HorariosPage /> },
          { path: 'reservas', element: <ReservasPage /> },
          { path: 'suscripciones', element: <SuscripcionesPage /> },
          { path: 'pagos', element: <PagosPage /> },
          { path: 'gastos', element: <GastosPage /> },
          { path: 'reportes', element: <ReportesPage /> },
        ],
      },
    ],
  },

  // Trainer routes
  {
    element: <RoleGuard roles={['entrenador']} />,
    children: [
      {
        path: '/entrenador',
        element: <TrainerLayout />,
        children: [
          { index: true, element: <Navigate to="horarios" replace /> },
          { path: 'horarios', element: <TrainerHorariosPage /> },
          { path: 'reservas', element: <TrainerReservasPage /> },
          { path: 'acumulado', element: <TrainerAcumuladoPage /> },
          { path: 'pagos', element: <TrainerPagosPage /> },
        ],
      },
    ],
  },

  // Client routes
  {
    element: <RoleGuard roles={['cliente']} />,
    children: [
      {
        path: '/cliente',
        element: <ClientLayout />,
        children: [
          { index: true, element: <Navigate to="suscripcion" replace /> },
          { path: 'suscripcion', element: <ClientSuscripcionPage /> },
          { path: 'planes', element: <ClientPlanesPage /> },
          { path: 'horarios', element: <ClientHorariosPage /> },
          { path: 'reservas', element: <ClientReservasPage /> },
          { path: 'pagos', element: <ClientPagosPage /> },
        ],
      },
    ],
  },

  // Error pages
  { path: '/403', element: <ForbiddenPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
