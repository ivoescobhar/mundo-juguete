import { useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ImagePlus, Loader2, X } from 'lucide-react';

export default function ImageField({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const handleChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      onChange(file_url);
    } finally {
      setBusy(false);
      event.target.value = '';
    }
  };

  return (
    <div>
      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-toyInk/50">{label}</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-toyInk bg-toySky">
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : null}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-toyInk bg-white px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em] transition-colors hover:bg-toySun"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" strokeWidth={2.5} />}
          {value ? 'Cambiar' : 'Subir foto'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-toyInk/40 hover:text-toyCoral"
          >
            <X className="h-3.5 w-3.5" strokeWidth={3} />
            Quitar
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
}