import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_GASTOS, REGISTRAR_GASTO } from '@/infrastructure/graphql/operations';
import { DataTable } from '@/shared/ui/DataTable';
import { PageHeader, ErrorBanner } from '@/shared/ui/PageElements';
import { Modal } from '@/shared/ui/Modal';

const emptyForm = { entrenadorId: '', monto: '', concepto: '' };

export default function GastosPage() {
  const { data, loading, error, refetch } = useQuery(GET_GASTOS);
  const [registrar] = useMutation(REGISTRAR_GASTO, { onCompleted: () => refetch() });
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [mutError, setMutError] = useState(null);

  const columns = [
    { key: 'entrenador', header: 'Entrenador', render: (r) => r.entrenador?.nombre ?? '—' },
    { key: 'monto', header: 'Monto', render: (r) => `$${r.monto}` },
    { key: 'concepto', header: 'Concepto' },
    { key: 'fecha', header: 'Fecha' },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setMutError(null);
    try {
      await registrar({ variables: { input: { ...form, monto: parseFloat(form.monto) } } });
      setOpen(false);
      setForm(emptyForm);
    } catch (err) {
      setMutError(err.message);
    }
  }

  return (
    <div>
      <PageHeader
        title="Gastos de entrenadores"
        action={<button onClick={() => setOpen(true)} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg text-sm">+ Registrar gasto</button>}
      />
      <ErrorBanner message={error?.message} />
      <DataTable columns={columns} data={data?.gastos} loading={loading} />

      <Modal open={open} onClose={() => setOpen(false)} title="Registrar gasto">
        <form onSubmit={handleSubmit} className="space-y-3">
          <ErrorBanner message={mutError} />
          {[
            { name: 'entrenadorId', label: 'ID Entrenador', type: 'text' },
            { name: 'monto', label: 'Monto', type: 'number' },
            { name: 'concepto', label: 'Concepto', type: 'text' },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-sm text-neutral-300 mb-1">{label}</label>
              <input type={type} value={form[name]} onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))} required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white" />
            </div>
          ))}
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 rounded-lg">Registrar</button>
        </form>
      </Modal>
    </div>
  );
}
