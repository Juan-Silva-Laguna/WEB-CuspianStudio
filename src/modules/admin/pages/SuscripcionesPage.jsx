import { useQuery, useMutation } from '@apollo/client/react';
import { GET_SUSCRIPCIONES, ACTIVAR_SUSCRIPCION } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner, Badge } from '@/shared/ui/PageElements';

export default function SuscripcionesPage() {
  const { data, loading, error, refetch } = useQuery(GET_SUSCRIPCIONES);
  const [activar] = useMutation(ACTIVAR_SUSCRIPCION, { onCompleted: () => refetch() });

  const columns = [
    { key: 'usuario', header: 'Cliente', render: (r) => r.usuario?.nombre ?? '—' },
    { key: 'plan', header: 'Plan', render: (r) => r.plan?.nombre ?? '—' },
    { key: 'tipo', header: 'Tipo', render: (r) => r.plan?.tipo ? <Badge>{r.plan.tipo}</Badge> : '—' },
    { key: 'fechaInicio', header: 'Inicio' },
    { key: 'fechaFin', header: 'Fin' },
    { key: 'activa', header: 'Estado', render: (r) => <Badge variant={r.activa ? 'success' : 'danger'}>{r.activa ? 'Activa' : 'Inactiva'}</Badge> },
    {
      key: 'acciones', header: '', render: (r) => !r.activa ? (
        <button onClick={() => activar({ variables: { suscripcionId: r.id } })} className="text-xs text-amber-400 hover:underline">
          Activar
        </button>
      ) : null,
    },
  ];

  return (
    <div>
      <PageHeader title="Suscripciones" description="Gestión de suscripciones activas e inactivas" />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.suscripciones} loading={loading} />
    </div>
  );
}
