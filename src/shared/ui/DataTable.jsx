/** Shared data table component */
export function DataTable({ columns, data, loading, emptyText = 'Sin datos' }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-neutral-800 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">{emptyText}</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-800 bg-neutral-900">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-3 text-neutral-400 font-medium whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id ?? idx}
              className="border-b border-neutral-800/50 hover:bg-neutral-800/40 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-neutral-300 whitespace-nowrap">
                  {col.render ? col.render(row) : row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
