import { useQuery } from '@apollo/client/react';
import { ACUMULADO_ENTRENADOR } from '@/infrastructure/graphql/operations';
import { PageHeader, ErrorBanner } from '@/shared/ui/PageElements';
import { useAuthStore } from '@/modules/auth/hooks/useAuthStore';

export default function TrainerAcumuladoPage() {
  const user = useAuthStore((s) => s.user);
  const { data, loading, error } = useQuery(ACUMULADO_ENTRENADOR, {
    variables: { entrenadorId: user?.id },
    skip: !user?.id,
  });
  const acumulado = data?.acumuladoEntrenador;

  return (
    <div>
      <PageHeader title="Mi acumulado" />
      <ErrorBanner message={error?.message} />
      {loading && <div className="text-neutral-400">Cargando…</div>}
      {acumulado && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { label: 'Total generado', value: acumulado.total, color: 'text-white' },
            { label: 'Pagado', value: acumulado.pagado, color: 'text-green-400' },
            { label: 'Pendiente', value: acumulado.pendiente, color: 'text-amber-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
              <div className="text-xs text-neutral-500 mb-1">{label}</div>
              <div className={`text-2xl font-bold ${color}`}>${value ?? 0}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
