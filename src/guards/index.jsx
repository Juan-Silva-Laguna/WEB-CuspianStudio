import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/hooks/useAuthStore';

/**
 * AuthGuard – only authenticated users may pass.
 */
export function AuthGuard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

/**
 * GuestGuard – redirect authenticated users away from guest routes.
 */
export function GuestGuard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  if (isAuthenticated) {
    const roleRoutes = { admin: '/admin', entrenador: '/entrenador', cliente: '/cliente' };
    return <Navigate to={roleRoutes[user?.rol] ?? '/'} replace />;
  }
  return <Outlet />;
}

/**
 * RoleGuard – only users with one of the allowed roles may pass.
 */
export function RoleGuard({ roles }) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!roles.includes(user?.rol)) return <Navigate to="/403" replace />;
  return <Outlet />;
}
