import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_SERVICIOS, CREAR_SERVICIO, ACTUALIZAR_SERVICIO } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner, Badge } from '@/shared/ui/PageElements';
import { Modal } from '@/shared/ui/Modal';

const emptyForm = { nombre: '', descripcion: '', precio: '' };

export default function ServiciosPage() {
  const { data, loading, error, refetch } = useQuery(GET_SERVICIOS);
  const [crear] = useMutation(CREAR_SERVICIO, { onCompleted: () => refetch() });
  const [actualizar] = useMutation(ACTUALIZAR_SERVICIO, { onCompleted: () => refetch() });
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [mutError, setMutError] = useState(null);

  const columns = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'descripcion', header: 'Descripción' },
    { key: 'precio', header: 'Precio', render: (r) => `$${r.precio}` },
    { key: 'activo', header: 'Estado', render: (r) => <Badge variant={r.activo ? 'success' : 'danger'}>{r.activo ? 'Activo' : 'Inactivo'}</Badge> },
    { key: 'acciones', header: '', render: (r) => <button onClick={() => { setModal(r); setForm({ nombre: r.nombre, descripcion: r.descripcion ?? '', precio: String(r.precio) }); }} className="text-xs text-amber-400 hover:underline">Editar</button> },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setMutError(null);
    const input = { ...form, precio: parseFloat(form.precio) };
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
        title="Servicios"
        action={<button onClick={() => { setForm(emptyForm); setMutError(null); setModal('crear'); }} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg text-sm">+ Nuevo servicio</button>}
      />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.servicios} loading={loading} />

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'crear' ? 'Nuevo servicio' : 'Editar servicio'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <ErrorBanner message={mutError} />
          {['nombre', 'descripcion', 'precio'].map((field) => (
            <div key={field}>
              <label className="block text-sm text-neutral-300 mb-1 capitalize">{field}</label>
              <input
                type={field === 'precio' ? 'number' : 'text'}
                step={field === 'precio' ? '0.01' : undefined}
                value={form[field]}
                onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                required={field !== 'descripcion'}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 rounded-lg">
            Guardar
          </button>
        </form>
      </Modal>
    </div>
  );
}
