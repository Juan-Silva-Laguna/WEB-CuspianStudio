import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_HORARIOS_DISPONIBLES, CREAR_RESERVA, RESERVAR_SERVICIO_PUNTUAL } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner, SuccessBanner } from '@/shared/ui/PageElements';
import { Modal } from '@/shared/ui/Modal';

export default function ClientHorariosPage() {
  const { data, loading, error } = useQuery(GET_HORARIOS_DISPONIBLES);
  const [reservar, { loading: resLoading }] = useMutation(CREAR_RESERVA);
  const [puntual, { loading: punLoading }] = useMutation(RESERVAR_SERVICIO_PUNTUAL);
  const [success, setSuccess] = useState(null);
  const [mutError, setMutError] = useState(null);
  const [punModal, setPunModal] = useState(false);
  const [punForm, setPunForm] = useState({ servicioId: '', fecha: '', hora: '' });

  async function handleReservar(horarioId) {
    setMutError(null); setSuccess(null);
    try {
      await reservar({ variables: { horarioId } });
      setSuccess('¡Reserva creada!');
    } catch (err) {
      setMutError(err.message);
    }
  }

  async function handlePuntual(e) {
    e.preventDefault();
    setMutError(null); setSuccess(null);
    try {
      await puntual({ variables: punForm });
      setSuccess('¡Servicio reservado!');
      setPunModal(false);
    } catch (err) {
      setMutError(err.message);
    }
  }

  const columns = [
    { key: 'fecha', header: 'Fecha' },
    { key: 'hora', header: 'Hora' },
    { key: 'entrenador', header: 'Entrenador', render: (r) => r.entrenador?.nombre ?? '—' },
    { key: 'sala', header: 'Sala', render: (r) => r.sala?.nombre ?? '—' },
    { key: 'servicio', header: 'Servicio', render: (r) => r.servicio?.nombre ?? '—' },
    { key: 'disponibles', header: 'Disponibles', render: (r) => r.capacidad - r.reservas },
    { key: 'accion', header: '', render: (r) => <button onClick={() => handleReservar(r.id)} disabled={resLoading} className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-semibold px-3 py-1 rounded-lg">Reservar</button> },
  ];

  return (
    <div>
      <PageHeader
        title="Horarios disponibles"
        action={<button onClick={() => setPunModal(true)} className="bg-neutral-800 hover:bg-neutral-700 text-white text-sm px-4 py-2 rounded-lg">Servicio puntual</button>}
      />
      <ErrorBanner message={error?.message ?? mutError} />
      <SuccessBanner message={success} />
      <DataTable columns={columns} data={data?.horariosDisponibles} loading={loading} />

      <Modal open={punModal} onClose={() => setPunModal(false)} title="Reservar servicio puntual">
        <form onSubmit={handlePuntual} className="space-y-3">
          {[
            { name: 'servicioId', label: 'ID Servicio', type: 'text' },
            { name: 'fecha', label: 'Fecha', type: 'date' },
            { name: 'hora', label: 'Hora', type: 'time' },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-sm text-neutral-300 mb-1">{label}</label>
              <input type={type} value={punForm[name]} onChange={(e) => setPunForm((p) => ({ ...p, [name]: e.target.value }))} required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white" />
            </div>
          ))}
          <button type="submit" disabled={punLoading} className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold py-2 rounded-lg">Reservar</button>
        </form>
      </Modal>
    </div>
  );
}
