import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_USUARIOS, ACTUALIZAR_USUARIO } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner, Badge } from '@/shared/ui/PageElements';
import { Modal } from '@/shared/ui/Modal';

export default function UsuariosPage() {
  const { data, loading, error, refetch } = useQuery(GET_USUARIOS);
  const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO, { onCompleted: () => refetch() });
  const [selected, setSelected] = useState(null);
  const [mutError, setMutError] = useState(null);

  const columns = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'email', header: 'Email' },
    { key: 'rol', header: 'Rol', render: (r) => <Badge>{r.rol}</Badge> },
    {
      key: 'activo',
      header: 'Estado',
      render: (r) => (
        <Badge variant={r.activo ? 'success' : 'danger'}>{r.activo ? 'Activo' : 'Inactivo'}</Badge>
      ),
    },
    {
      key: 'acciones',
      header: '',
      render: (r) => (
        <button
          onClick={() => setSelected(r)}
          className="text-xs text-amber-400 hover:underline"
        >
          Editar
        </button>
      ),
    },
  ];

  async function handleUpdate(e) {
    e.preventDefault();
    setMutError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await actualizarUsuario({
        variables: {
          id: selected.id,
          input: { nombre: fd.get('nombre'), activo: fd.get('activo') === 'true' },
        },
      });
      setSelected(null);
    } catch (err) {
      setMutError(err.message);
    }
  }

  return (
    <div>
      <PageHeader title="Usuarios" description="Gestión de usuarios del sistema" />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.usuarios} loading={loading} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Editar usuario">
        {selected && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <ErrorBanner message={mutError} />
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Nombre</label>
              <input
                name="nombre"
                defaultValue={selected.nombre}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Estado</label>
              <select
                name="activo"
                defaultValue={String(selected.activo)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 rounded-lg"
            >
              Guardar
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
