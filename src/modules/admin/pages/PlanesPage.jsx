import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_PLANES, CREAR_PLAN, ACTUALIZAR_PLAN } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner, Badge } from '@/shared/ui/PageElements';
import { Modal } from '@/shared/ui/Modal';

const emptyForm = { nombre: '', tipo: 'basico', precio: '', duracionDias: '' };

export default function PlanesPage() {
  const { data, loading, error, refetch } = useQuery(GET_PLANES);
  const [crear] = useMutation(CREAR_PLAN, { onCompleted: () => refetch() });
  const [actualizar] = useMutation(ACTUALIZAR_PLAN, { onCompleted: () => refetch() });
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [mutError, setMutError] = useState(null);

  const columns = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'tipo', header: 'Tipo', render: (r) => <Badge>{r.tipo}</Badge> },
    { key: 'precio', header: 'Precio', render: (r) => `$${r.precio}` },
    { key: 'duracionDias', header: 'Duración (días)' },
    { key: 'activo', header: 'Estado', render: (r) => <Badge variant={r.activo ? 'success' : 'danger'}>{r.activo ? 'Activo' : 'Inactivo'}</Badge> },
    { key: 'acciones', header: '', render: (r) => <button onClick={() => { setModal(r); setForm({ nombre: r.nombre, tipo: r.tipo, precio: String(r.precio), duracionDias: String(r.duracionDias) }); }} className="text-xs text-amber-400 hover:underline">Editar</button> },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setMutError(null);
    const input = { ...form, precio: parseFloat(form.precio), duracionDias: parseInt(form.duracionDias, 10) };
    try {
      if (modal === 'crear') {
        await crear({ variables: { input } });
      } else {
        await actualizar({ variables: { id: modal.id, input } });
      }
      setModal(null);
    } catch (err) {
      setMutError(err.message);
    }
  }

  return (
    <div>
      <PageHeader
        title="Planes"
        action={<button onClick={() => { setForm(emptyForm); setMutError(null); setModal('crear'); }} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg text-sm">+ Nuevo plan</button>}
      />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.planes} loading={loading} />

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'crear' ? 'Nuevo plan' : 'Editar plan'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <ErrorBanner message={mutError} />
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Nombre</label>
            <input value={form.nombre} onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))} required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Tipo</label>
            <select value={form.tipo} onChange={(e) => setForm((p) => ({ ...p, tipo: e.target.value }))} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white">
              <option value="basico">Básico</option>
              <option value="ilimitado">Ilimitado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Precio</label>
            <input type="number" step="0.01" value={form.precio} onChange={(e) => setForm((p) => ({ ...p, precio: e.target.value }))} required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Duración (días)</label>
            <input type="number" value={form.duracionDias} onChange={(e) => setForm((p) => ({ ...p, duracionDias: e.target.value }))} required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white" />
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 rounded-lg">
            Guardar
          </button>
        </form>
      </Modal>
    </div>
  );
}
