import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_ENTRENADORES,
  CREAR_ENTRENADOR,
  ACTUALIZAR_ENTRENADOR,
} from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner, Badge } from '@/shared/ui/PageElements';
import { Modal } from '@/shared/ui/Modal';

const emptyForm = { nombre: '', email: '', password: '', especialidad: '' };

export default function EntrenadoresPage() {
  const { data, loading, error, refetch } = useQuery(GET_ENTRENADORES);
  const [crear] = useMutation(CREAR_ENTRENADOR, { onCompleted: () => refetch() });
  const [actualizar] = useMutation(ACTUALIZAR_ENTRENADOR, { onCompleted: () => refetch() });
  const [modal, setModal] = useState(null); // null | 'crear' | row
  const [form, setForm] = useState(emptyForm);
  const [mutError, setMutError] = useState(null);

  const columns = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'email', header: 'Email' },
    { key: 'especialidad', header: 'Especialidad' },
    { key: 'activo', header: 'Estado', render: (r) => <Badge variant={r.activo ? 'success' : 'danger'}>{r.activo ? 'Activo' : 'Inactivo'}</Badge> },
    { key: 'acciones', header: '', render: (r) => <button onClick={() => { setModal(r); setForm({ nombre: r.nombre, email: r.email, especialidad: r.especialidad ?? '', password: '' }); }} className="text-xs text-amber-400 hover:underline">Editar</button> },
  ];

  function openCrear() { setForm(emptyForm); setMutError(null); setModal('crear'); }

  async function handleSubmit(e) {
    e.preventDefault();
    setMutError(null);
    try {
      if (modal === 'crear') {
        await crear({ variables: { input: form } });
      } else {
        const { password: _pw, ...rest } = form;
        await actualizar({ variables: { id: modal.id, input: rest } });
      }
      setModal(null);
    } catch (err) {
      setMutError(err.message);
    }
  }

  const isCrear = modal === 'crear';

  return (
    <div>
      <PageHeader
        title="Entrenadores"
        action={<button onClick={openCrear} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg text-sm">+ Nuevo entrenador</button>}
      />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.entrenadores} loading={loading} />

      <Modal open={!!modal} onClose={() => setModal(null)} title={isCrear ? 'Nuevo entrenador' : 'Editar entrenador'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <ErrorBanner message={mutError} />
          {['nombre', 'email', ...(isCrear ? ['password'] : []), 'especialidad'].map((field) => (
            <div key={field}>
              <label className="block text-sm text-neutral-300 mb-1 capitalize">{field}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                value={form[field] ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                required={field !== 'especialidad'}
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
