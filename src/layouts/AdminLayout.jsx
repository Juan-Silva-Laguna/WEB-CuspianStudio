import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/hooks/useAuthStore';
import {
  Users,
  PersonSimpleRun,
  Door,
  Lightning,
  CreditCard,
  Calendar,
  BookOpen,
  Receipt,
  Wallet,
  ChartBar,
  SignOut,
  List,
  X,
} from '@phosphor-icons/react';

const NAV_ITEMS = [
  { to: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { to: '/admin/entrenadores', label: 'Entrenadores', icon: PersonSimpleRun },
  { to: '/admin/salas', label: 'Salas', icon: Door },
  { to: '/admin/servicios', label: 'Servicios', icon: Lightning },
  { to: '/admin/planes', label: 'Planes', icon: CreditCard },
  { to: '/admin/horarios', label: 'Horarios', icon: Calendar },
  { to: '/admin/reservas', label: 'Reservas', icon: BookOpen },
  { to: '/admin/suscripciones', label: 'Suscripciones', icon: Receipt },
  { to: '/admin/pagos', label: 'Pagos', icon: Wallet },
  { to: '/admin/gastos', label: 'Gastos', icon: Receipt },
  { to: '/admin/reportes', label: 'Reportes', icon: ChartBar },
];

function SidebarItem({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-amber-500 text-black'
            : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
        }`
      }
    >
      <Icon size={18} weight="bold" />
      {label}
    </NavLink>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-neutral-900 border-r border-neutral-800 z-30 flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static`}
      >
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <span className="text-amber-400 font-bold text-lg">Cuspian Admin</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-neutral-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <SidebarItem key={item.to} {...item} />
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <div className="text-xs text-neutral-500 mb-2 truncate">{user?.nombre}</div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-red-400 transition"
          >
            <SignOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-neutral-400 hover:text-white">
            <List size={22} />
          </button>
          <span className="text-amber-400 font-bold">Cuspian Admin</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
