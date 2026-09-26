import { useQuery } from '@apollo/client/react';
import { MIS_HORARIOS } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner } from '@/shared/ui/PageElements';

export default function TrainerHorariosPage() {
  const { data, loading, error } = useQuery(MIS_HORARIOS);
  const columns = [
    { key: 'fecha', header: 'Fecha' },
    { key: 'hora', header: 'Hora' },
    { key: 'sala', header: 'Sala', render: (r) => r.sala?.nombre ?? '—' },
    { key: 'servicio', header: 'Servicio', render: (r) => r.servicio?.nombre ?? '—' },
    { key: 'capacidad', header: 'Capacidad' },
    { key: 'reservas', header: 'Reservas' },
  ];
  return (
    <div>
      <PageHeader title="Mis horarios" />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.misHorarios} loading={loading} />
    </div>
  );
}
