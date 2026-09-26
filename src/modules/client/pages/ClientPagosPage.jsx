import { useQuery } from '@apollo/client/react';
import { MIS_PAGOS } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner } from '@/shared/ui/PageElements';

export default function ClientPagosPage() {
  const { data, loading, error } = useQuery(MIS_PAGOS);
  const columns = [
    { key: 'monto', header: 'Monto', render: (r) => `$${r.monto}` },
    { key: 'concepto', header: 'Concepto' },
    { key: 'metodo', header: 'Método' },
    { key: 'fecha', header: 'Fecha' },
  ];
  return (
    <div>
      <PageHeader title="Mis pagos" />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.misPagos} loading={loading} />
    </div>
  );
}
