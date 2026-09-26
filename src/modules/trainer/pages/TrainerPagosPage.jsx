import { useQuery } from '@apollo/client/react';
import { PAGOS_POR_ENTRENADOR } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner } from '@/shared/ui/PageElements';
import { useAuthStore } from '@/modules/auth/hooks/useAuthStore';

export default function TrainerPagosPage() {
  const user = useAuthStore((s) => s.user);
  const { data, loading, error } = useQuery(PAGOS_POR_ENTRENADOR, {
    variables: { entrenadorId: user?.id },
    skip: !user?.id,
  });
  const columns = [
    { key: 'monto', header: 'Monto', render: (r) => `$${r.monto}` },
    { key: 'concepto', header: 'Concepto' },
    { key: 'fecha', header: 'Fecha' },
  ];
  return (
    <div>
      <PageHeader title="Mis pagos" />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.pagosPorEntrenador} loading={loading} />
    </div>
  );
}
