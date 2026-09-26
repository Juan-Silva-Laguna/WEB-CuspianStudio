import { useState } from 'react';
import { useLazyQuery } from '@apollo/client/react';
import { REPORTE_VENTAS } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner } from '@/shared/ui/PageElements';

export default function ReportesPage() {
  const today = new Date().toISOString().slice(0, 10);
  const firstDay = today.slice(0, 8) + '01';
  const [fechaInicio, setFechaInicio] = useState(firstDay);
  const [fechaFin, setFechaFin] = useState(today);
  const [fetch, { data, loading, error }] = useLazyQuery(REPORTE_VENTAS);

  function handleSubmit(e) {
    e.preventDefault();
    fetch({ variables: { fechaInicio, fechaFin } });
  }

  const reporte = data?.reporteVentas;

  const columns = [
    { key: 'concepto', header: 'Concepto' },
    { key: 'monto', header: 'Monto', render: (r) => `$${r.monto}` },
    { key: 'fecha', header: 'Fecha' },
  ];

  return (
    <div>
      <PageHeader title="Reportes de ventas" description="Resumen financiero por período" />

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mb-6 items-end">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Desde</label>
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm" />
        </div>
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Hasta</label>
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm" />
        </div>
        <button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold px-4 py-2 rounded-lg text-sm">
          {loading ? 'Cargando…' : 'Generar reporte'}
        </button>
      </form>

      <ErrorBanner message={error?.message} />

      {reporte && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Ingresos', value: reporte.totalIngresos, color: 'text-green-400' },
              { label: 'Gastos', value: reporte.totalGastos, color: 'text-red-400' },
              { label: 'Utilidad', value: reporte.utilidad, color: 'text-amber-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                <div className="text-xs text-neutral-500 mb-1">{label}</div>
                <div className={`text-2xl font-bold ${color}`}>${value ?? 0}</div>
              </div>
            ))}
          </div>
          <DataTable columns={columns} data={reporte.pagos} emptyText="Sin pagos en este período" />
        </div>
      )}
    </div>
  );
}
