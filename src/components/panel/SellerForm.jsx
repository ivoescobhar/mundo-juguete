import { useState } from 'react';
import ImageField from '@/components/panel/ImageField';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';

export default function SellerForm({ seller, onSave }) {
  const [values, setValues] = useState({ ...seller });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (key) => (event) => {
    setSaved(false);
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const setValue = (key) => (value) => {
    setSaved(false);
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSave(values);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[24px] border-[3px] border-toyInk bg-white p-5 shadow-brutal-sm sm:p-6">
      <h2 className="font-display text-base uppercase">Datos del vendedor</h2>
      <p className="mt-1 text-xs text-toyInk/50">Todo lo que escribas aquí aparece en el PDF.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="display_name">Nombre de la tienda</Label>
          <Input id="display_name" value={values.display_name || ''} onChange={set('display_name')} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input id="whatsapp" value={values.whatsapp || ''} onChange={set('whatsapp')} placeholder="+51 987 654 321" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <Input id="instagram" value={values.instagram || ''} onChange={set('instagram')} placeholder="@mitienda" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" value={values.city || ''} onChange={set('city')} placeholder="Lima, Perú" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hours">Horario de atención</Label>
          <Input id="hours" value={values.hours || ''} onChange={set('hours')} placeholder="Lun a sáb, 10am - 7pm" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tagline">Etiqueta de portada</Label>
          <Input id="tagline" value={values.tagline || ''} onChange={set('tagline')} placeholder="Juguetes originales" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="catalog_title">Título del catálogo</Label>
          <Input
            id="catalog_title"
            value={values.catalog_title || ''}
            onChange={set('catalog_title')}
            placeholder="El juego es un mundo serio"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="catalog_subtitle">Subtítulo del catálogo</Label>
          <Textarea
            id="catalog_subtitle"
            value={values.catalog_subtitle || ''}
            onChange={set('catalog_subtitle')}
            rows={2}
            placeholder="Juguetes elegidos con criterio para regalar sin dudar."
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="note">Nota al pie</Label>
          <Input
            id="note"
            value={values.note || ''}
            onChange={set('note')}
            placeholder="Precios de referencia. Consulta stock antes de comprar."
          />
        </div>
        <ImageField label="Logo" value={values.logo_url} onChange={setValue('logo_url')} />
        <ImageField label="Foto de portada" value={values.hero_image_url} onChange={setValue('hero_image_url')} />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl border-[3px] border-toyInk bg-toySun px-5 py-2.5 font-display text-[11px] uppercase tracking-[0.08em] shadow-brutal-sm transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" strokeWidth={2.5} />}
          Guardar datos
        </button>
        {saved && (
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-toyInk/45">
            Datos guardados
          </span>
        )}
      </div>
    </form>
  );
}