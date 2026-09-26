import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_HORARIOS,
  CREAR_HORARIO,
  ACTUALIZAR_HORARIO,
  ELIMINAR_HORARIO,
} from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner, Badge } from '@/shared/ui/PageElements';
import { Modal } from '@/shared/ui/Modal';

const emptyForm = { entrenadorId: '', salaId: '', servicioId: '', fecha: '', hora: '', capacidad: '' };

export default function HorariosPage() {
  const { data, loading, error, refetch } = useQuery(GET_HORARIOS);
  const [crear] = useMutation(CREAR_HORARIO, { onCompleted: () => refetch() });
  const [actualizar] = useMutation(ACTUALIZAR_HORARIO, { onCompleted: () => refetch() });
  const [eliminar] = useMutation(ELIMINAR_HORARIO, { onCompleted: () => refetch() });
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [mutError, setMutError] = useState(null);

  const columns = [
    { key: 'fecha', header: 'Fecha' },
    { key: 'hora', header: 'Hora' },
    { key: 'entrenador', header: 'Entrenador', render: (r) => r.entrenador?.nombre ?? '—' },
    { key: 'sala', header: 'Sala', render: (r) => r.sala?.nombre ?? '—' },
    { key: 'servicio', header: 'Servicio', render: (r) => r.servicio?.nombre ?? '—' },
    { key: 'capacidad', header: 'Cap.' },
    { key: 'reservas', header: 'Reservas' },
    { key: 'activo', header: 'Estado', render: (r) => <Badge variant={r.activo ? 'success' : 'danger'}>{r.activo ? 'Activo' : 'Inactivo'}</Badge> },
    {
      key: 'acciones', header: '', render: (r) => (
        <div className="flex gap-2">
          <button onClick={() => { setModal(r); setForm({ entrenadorId: r.entrenador?.id ?? '', salaId: r.sala?.id ?? '', servicioId: r.servicio?.id ?? '', fecha: r.fecha, hora: r.hora, capacidad: String(r.capacidad) }); }} className="text-xs text-amber-400 hover:underline">Editar</button>
          <button onClick={() => eliminar({ variables: { id: r.id } })} className="text-xs text-red-400 hover:underline">Eliminar</button>
        </div>
      ),
    },
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

  function field(name, label, type = 'text') {
    return (
      <div key={name}>
        <label className="block text-sm text-neutral-300 mb-1">{label}</label>
        <input type={type} value={form[name]} onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))} required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Horarios"
        action={<button onClick={() => { setForm(emptyForm); setMutError(null); setModal('crear'); }} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg text-sm">+ Nuevo horario</button>}
      />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.horarios} loading={loading} />

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'crear' ? 'Nuevo horario' : 'Editar horario'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <ErrorBanner message={mutError} />
          {field('entrenadorId', 'ID Entrenador')}
          {field('salaId', 'ID Sala')}
          {field('servicioId', 'ID Servicio')}
          {field('fecha', 'Fecha', 'date')}
          {field('hora', 'Hora', 'time')}
          {field('capacidad', 'Capacidad', 'number')}
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 rounded-lg">
            Guardar
          </button>
        </form>
      </Modal>
    </div>
  );
}
