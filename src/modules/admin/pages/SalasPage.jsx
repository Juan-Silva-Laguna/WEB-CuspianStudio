import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_SALAS, CREAR_SALA, ACTUALIZAR_SALA } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner, Badge } from '@/shared/ui/PageElements';
import { Modal } from '@/shared/ui/Modal';

const emptyForm = { nombre: '', capacidad: '', descripcion: '' };

export default function SalasPage() {
  const { data, loading, error, refetch } = useQuery(GET_SALAS);
  const [crear] = useMutation(CREAR_SALA, { onCompleted: () => refetch() });
  const [actualizar] = useMutation(ACTUALIZAR_SALA, { onCompleted: () => refetch() });
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [mutError, setMutError] = useState(null);

  const columns = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'capacidad', header: 'Capacidad' },
    { key: 'descripcion', header: 'Descripción' },
    { key: 'activa', header: 'Estado', render: (r) => <Badge variant={r.activa ? 'success' : 'danger'}>{r.activa ? 'Activa' : 'Inactiva'}</Badge> },
    { key: 'acciones', header: '', render: (r) => <button onClick={() => { setModal(r); setForm({ nombre: r.nombre, capacidad: String(r.capacidad), descripcion: r.descripcion ?? '' }); }} className="text-xs text-amber-400 hover:underline">Editar</button> },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setMutError(null);
    const input = { ...form, capacidad: parseInt(form.capacidad, 10) };
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
        title="Salas"
        action={<button onClick={() => { setForm(emptyForm); setMutError(null); setModal('crear'); }} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg text-sm">+ Nueva sala</button>}
      />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.salas} loading={loading} />

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'crear' ? 'Nueva sala' : 'Editar sala'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <ErrorBanner message={mutError} />
          {['nombre', 'capacidad', 'descripcion'].map((field) => (
            <div key={field}>
              <label className="block text-sm text-neutral-300 mb-1 capitalize">{field}</label>
              <input
                type={field === 'capacidad' ? 'number' : 'text'}
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
