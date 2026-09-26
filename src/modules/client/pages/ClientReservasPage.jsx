import { useQuery, useMutation } from '@apollo/client/react';
import { MIS_RESERVAS, CANCELAR_RESERVA } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner, Badge } from '@/shared/ui/PageElements';

export default function ClientReservasPage() {
  const { data, loading, error, refetch } = useQuery(MIS_RESERVAS);
  const [cancelar] = useMutation(CANCELAR_RESERVA, { onCompleted: () => refetch() });

  const columns = [
    { key: 'servicio', header: 'Servicio', render: (r) => r.horario?.servicio?.nombre ?? '—' },
    { key: 'fecha', header: 'Fecha/Hora', render: (r) => r.horario ? `${r.horario.fecha} ${r.horario.hora}` : '—' },
    { key: 'estado', header: 'Estado', render: (r) => <Badge variant={r.estado === 'activa' ? 'success' : 'default'}>{r.estado}</Badge> },
    {
      key: 'accion', header: '', render: (r) => r.estado === 'activa' ? (
        <button onClick={() => cancelar({ variables: { id: r.id } })} className="text-xs text-red-400 hover:underline">
          Cancelar
        </button>
      ) : null,
    },
  ];

  return (
    <div>
      <PageHeader title="Mis reservas" />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.misReservas} loading={loading} />
    </div>
  );
}
