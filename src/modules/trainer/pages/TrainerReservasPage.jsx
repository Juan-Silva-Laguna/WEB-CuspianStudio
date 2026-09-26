import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { RESERVAS_POR_HORARIO, MARCAR_ASISTENCIA, MIS_HORARIOS } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner, Badge } from '@/shared/ui/PageElements';

export default function TrainerReservasPage() {
  const { data: horariosData } = useQuery(MIS_HORARIOS);
  const [horarioId, setHorarioId] = useState('');
  const { data, loading, error, refetch } = useQuery(RESERVAS_POR_HORARIO, {
    variables: { horarioId },
    skip: !horarioId,
  });
  const [marcar] = useMutation(MARCAR_ASISTENCIA, { onCompleted: () => refetch() });

  const columns = [
    { key: 'usuario', header: 'Cliente', render: (r) => r.usuario?.nombre ?? '—' },
    { key: 'estado', header: 'Estado', render: (r) => <Badge>{r.estado}</Badge> },
    {
      key: 'asistencia', header: 'Asistencia', render: (r) => (
        <div className="flex gap-2">
          <button onClick={() => marcar({ variables: { reservaId: r.id, asistio: true } })} className={`text-xs px-2 py-0.5 rounded ${r.asistencia === true ? 'bg-green-700 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-green-800'}`}>✓</button>
          <button onClick={() => marcar({ variables: { reservaId: r.id, asistio: false } })} className={`text-xs px-2 py-0.5 rounded ${r.asistencia === false ? 'bg-red-700 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-red-800'}`}>✗</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Reservas por horario" />
      <div className="mb-4">
        <label className="block text-sm text-neutral-400 mb-1">Selecciona un horario</label>
        <select value={horarioId} onChange={(e) => setHorarioId(e.target.value)} className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm min-w-48">
          <option value="">— Seleccionar —</option>
          {horariosData?.misHorarios?.map((h) => (
            <option key={h.id} value={h.id}>{h.fecha} {h.hora} — {h.servicio?.nombre}</option>
          ))}
        </select>
      </div>
      <ErrorBanner message={error?.message} />
      {horarioId && <DataTable columns={columns} data={data?.reservasPorHorario} loading={loading} />}
    </div>
  );
}
