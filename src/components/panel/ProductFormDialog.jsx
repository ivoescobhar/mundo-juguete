import { useState } from 'react';
import ImageField from '@/components/panel/ImageField';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const EMPTY = {
  name: '',
  sku: '',
  price: '',
  category: '',
  age_range: '',
  tag: '',
  description: '',
  image_url: '',
};

function toValues(product) {
  if (!product) return { ...EMPTY };
  return {
    name: product.name || '',
    sku: product.sku || '',
    price: product.price ?? '',
    category: product.category || '',
    age_range: product.age_range || '',
    tag: product.tag || '',
    description: product.description || '',
    image_url: product.image_url || '',
  };
}

export default function ProductFormDialog({ product, onSubmit, trigger }) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(toValues(product));
  const [saving, setSaving] = useState(false);

  const handleOpenChange = (next) => {
    if (next) setValues(toValues(product));
    setOpen(next);
  };

  const set = (key) => (event) => setValues((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({ ...values, price: Number(values.price) || 0 });
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display uppercase">
            {product ? 'Editar juguete' : 'Nuevo juguete'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" value={values.name} onChange={set('name')} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" value={values.sku} onChange={set('sku')} placeholder="MJ-0000" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Precio (S/)</Label>
              <Input id="price" type="number" min="0" step="0.5" value={values.price} onChange={set('price')} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Input id="category" value={values.category} onChange={set('category')} placeholder="Peluches" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age_range">Edad</Label>
              <Input id="age_range" value={values.age_range} onChange={set('age_range')} placeholder="3+" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag">Etiqueta</Label>
            <Input id="tag" value={values.tag} onChange={set('tag')} placeholder="Más pedido" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción corta</Label>
            <Textarea
              id="description"
              value={values.description}
              onChange={set('description')}
              rows={2}
              maxLength={110}
              placeholder="Piezas de madera con acabado al agua."
            />
          </div>

          <ImageField
            label="Foto del juguete"
            value={values.image_url}
            onChange={(url) => setValues((prev) => ({ ...prev, image_url: url }))}
          />

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-[3px] border-toyInk bg-toySun px-5 py-3 font-display text-[11px] uppercase tracking-[0.08em] shadow-brutal-sm disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {product ? 'Guardar cambios' : 'Agregar al catálogo'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}