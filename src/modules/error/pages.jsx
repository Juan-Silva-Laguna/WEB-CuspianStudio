import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-center p-8">
      <div>
        <div className="text-8xl font-bold text-amber-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Página no encontrada</h1>
        <p className="text-neutral-400 mb-6">La página que buscas no existe.</p>
        <Link to="/" className="text-amber-400 hover:underline">Volver al inicio</Link>
      </div>
    </div>
  );
}

export function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-center p-8">
      <div>
        <div className="text-8xl font-bold text-red-500 mb-4">403</div>
        <h1 className="text-2xl font-bold text-white mb-2">Sin permisos</h1>
        <p className="text-neutral-400 mb-6">No tienes acceso a esta sección.</p>
        <Link to="/" className="text-amber-400 hover:underline">Volver al inicio</Link>
      </div>
    </div>
  );
}
