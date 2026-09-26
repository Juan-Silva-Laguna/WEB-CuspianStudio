import { useQuery, useMutation } from '@apollo/client/react';
import { MI_SUSCRIPCION, RENOVAR_SUSCRIPCION } from '@/infrastructure/graphql/operations';
import { PageHeader, ErrorBanner, Badge } from '@/shared/ui/PageElements';

export default function ClientSuscripcionPage() {
  const { data, loading, error, refetch } = useQuery(MI_SUSCRIPCION);
  const [renovar, { loading: renLoading }] = useMutation(RENOVAR_SUSCRIPCION, { onCompleted: () => refetch() });
  const s = data?.miSuscripcion;

  return (
    <div>
      <PageHeader title="Mi suscripción" />
      <ErrorBanner message={error?.message} />
      {loading && <div className="text-neutral-400">Cargando…</div>}
      {!loading && !s && (
        <div className="text-neutral-500 py-8 text-center">No tienes suscripción activa. Ve a <strong>Planes</strong> para suscribirte.</div>
      )}
      {s && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">{s.plan?.nombre}</h2>
            <Badge variant={s.activa ? 'success' : 'danger'}>{s.activa ? 'Activa' : 'Inactiva'}</Badge>
          </div>
          <div className="space-y-2 text-sm text-neutral-400">
            <div>Tipo: <span className="text-white">{s.plan?.tipo}</span></div>
            <div>Inicio: <span className="text-white">{s.fechaInicio}</span></div>
            <div>Vence: <span className="text-white">{s.fechaFin}</span></div>
          </div>
          <button
            onClick={() => renovar({ variables: { suscripcionId: s.id } })}
            disabled={renLoading}
            className="mt-4 w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold py-2 rounded-lg"
          >
            {renLoading ? 'Renovando…' : 'Renovar suscripción'}
          </button>
        </div>
      )}
    </div>
  );
}
