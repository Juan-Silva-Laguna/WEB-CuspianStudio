import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_RESERVAS, GET_RESERVAS_POR_FECHA } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, Badge } from '@/shared/ui/PageElements';

export default function ReservasPage() {
  const [fecha, setFecha] = useState('');
  const { data: all, loading: allLoading } = useQuery(GET_RESERVAS, { skip: !!fecha });
  const { data: byDate, loading: byDateLoading } = useQuery(GET_RESERVAS_POR_FECHA, {
    variables: { fecha },
    skip: !fecha,
  });

  const reservas = fecha ? byDate?.reservasPorFecha : all?.reservas;
  const loading = fecha ? byDateLoading : allLoading;

  const columns = [
    { key: 'usuario', header: 'Cliente', render: (r) => r.usuario?.nombre ?? '—' },
    { key: 'horario', header: 'Horario', render: (r) => r.horario ? `${r.horario.fecha} ${r.horario.hora}` : '—' },
    { key: 'estado', header: 'Estado', render: (r) => <Badge variant={r.estado === 'activa' ? 'success' : 'default'}>{r.estado}</Badge> },
    { key: 'createdAt', header: 'Creado' },
  ];

  return (
    <div>
      <PageHeader title="Reservas" description="Listado de reservas del sistema" />
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm text-neutral-400">Filtrar por fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-white text-sm"
        />
        {fecha && (
          <button onClick={() => setFecha('')} className="text-xs text-neutral-400 hover:text-white">
            Limpiar
          </button>
        )}
      </div>
      <DataTable columns={columns} data={reservas} loading={loading} />
    </div>
  );
}
