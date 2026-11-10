import { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { exportAppToPdf } from '@/lib/appPdfExport';

export default function ExportPdfButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleExport = async () => {
    if (busy) return;
    const root = document.querySelector('[data-pdf-root]');
    if (!root) return;
    setBusy(true);
    setError('');
    try {
      await exportAppToPdf(root, { filename: 'mundo-juguete.pdf' });
    } catch {
      setError('No se pudo generar el PDF. Inténtalo otra vez.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-8 sm:right-8">
      {error && (
        <p className="max-w-[230px] rounded-xl border-[3px] border-toyInk bg-white px-3 py-2 text-[11px] font-bold leading-snug text-toyCoral shadow-brutal-sm">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleExport}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-2xl border-[3px] border-toyInk bg-white px-4 py-3 font-display text-[10px] uppercase tracking-[0.1em] shadow-brutal transition-all duration-200 hover:-translate-y-0.5 hover:bg-toySky active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-wait disabled:opacity-70 sm:px-5 sm:text-[11px]"
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
        ) : (
          <FileDown className="h-4 w-4" strokeWidth={2.5} />
        )}
        {busy ? 'Generando PDF' : 'Exportar a PDF'}
      </button>
    </div>
  );
}