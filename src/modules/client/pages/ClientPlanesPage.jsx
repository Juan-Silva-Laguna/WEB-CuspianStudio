import { useQuery, useMutation } from '@apollo/client/react';
import { GET_PLANES, SUSCRIBIRME } from '@/infrastructure/graphql/operations';
import { PageHeader, ErrorBanner, Badge, SuccessBanner } from '@/shared/ui/PageElements';
import { useState } from 'react';

export default function ClientPlanesPage() {
  const { data, loading, error } = useQuery(GET_PLANES);
  const [suscribir, { loading: subLoading }] = useMutation(SUSCRIBIRME);
  const [success, setSuccess] = useState(null);
  const [mutError, setMutError] = useState(null);

  async function handleSuscribir(planId) {
    setMutError(null); setSuccess(null);
    try {
      await suscribir({ variables: { planId } });
      setSuccess('¡Te suscribiste exitosamente!');
    } catch (err) {
      setMutError(err.message);
    }
  }

  return (
    <div>
      <PageHeader title="Planes disponibles" />
      <ErrorBanner message={error?.message ?? mutError} />
      <SuccessBanner message={success} />
      {loading && <div className="text-neutral-400">Cargando…</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.planes?.filter((p) => p.activo).map((plan) => (
          <div key={plan.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-bold">{plan.nombre}</h3>
              <Badge>{plan.tipo}</Badge>
            </div>
            <div className="text-3xl font-bold text-amber-400 mb-1">${plan.precio}</div>
            <div className="text-sm text-neutral-500 mb-4">{plan.duracionDias} días</div>
            <button
              onClick={() => handleSuscribir(plan.id)}
              disabled={subLoading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold py-2 rounded-lg text-sm"
            >
              Suscribirme
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
