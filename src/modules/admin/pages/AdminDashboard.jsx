import { useAuthStore } from '@/modules/auth/hooks/useAuthStore';

export default function AdminDashboard() {
  const user = useAuthStore((s) => s.user);
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Panel de administración</h1>
      <p className="text-neutral-400">Bienvenido, {user?.nombre}. Selecciona una sección en el menú lateral.</p>
    </div>
  );
}
