import { base44 } from '@/api/base44Client';
import ProductFormDialog from '@/components/panel/ProductFormDialog';
import { formatPrice } from '@/lib/format';
import { Pencil, Plus, Trash2 } from 'lucide-react';

export default function SellerProducts({ sellerId, products, onChanged, loading }) {
  const handleSubmit = async (values, product) => {
    const payload = {
      name: values.name,
      sku: values.sku,
      price: values.price,
      category: values.category,
      age_range: values.age_range,
      tag: values.tag,
      description: values.description,
      image_url: values.image_url,
      active: true,
    };

    if (product) {
      await base44.entities.Product.update(product.id, payload);
    } else {
      await base44.entities.Product.create({ ...payload, seller_id: sellerId });
    }
    await onChanged();
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`¿Eliminar "${product.name}" del catálogo?`);
    if (!confirmed) return;
    await base44.entities.Product.delete(product.id);
    await onChanged();
  };

  return (
    <section className="rounded-[24px] border-[3px] border-toyInk bg-white p-5 shadow-brutal-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-base uppercase">Juguetes del catálogo</h2>
          <p className="mt-1 text-xs text-toyInk/50">
            Se reparten de 6 en 6 por página en el PDF.
          </p>
        </div>
        <ProductFormDialog
          onSubmit={(values) => handleSubmit(values)}
          trigger={
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border-[3px] border-toyInk bg-toySun px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.08em] shadow-brutal-sm transition-transform hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" strokeWidth={3} />
              Agregar juguete
            </button>
          }
        />
      </div>

      {loading ? (
        <div className="mt-6 space-y-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-16 animate-pulse rounded-xl bg-toyInk/[0.06]" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="mt-6 rounded-2xl border-2 border-dashed border-toyInk/25 px-5 py-10 text-center">
          <p className="font-display text-sm uppercase">Sin juguetes todavía</p>
          <p className="mt-1.5 text-xs text-toyInk/50">
            Agrega el primer juguete para armar el PDF de este vendedor.
          </p>
        </div>
      ) : (
        <ul className="mt-5 divide-y divide-toyInk/10">
          {products.map((product) => (
            <li key={product.id} className="flex items-center gap-3 py-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-toyInk bg-toySky">
                {product.image_url && (
                  <img src={product.image_url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm uppercase leading-tight">{product.name}</p>
                <p className="mt-1 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-toyInk/40">
                  {[product.sku, product.category, product.age_range].filter(Boolean).join(' · ')}
                </p>
              </div>
              <p className="shrink-0 font-display text-sm">S/ {formatPrice(product.price)}</p>
              <div className="flex shrink-0 items-center gap-1">
                <ProductFormDialog
                  product={product}
                  onSubmit={(values) => handleSubmit(values, product)}
                  trigger={
                    <button
                      type="button"
                      aria-label={`Editar ${product.name}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border-2 border-toyInk bg-white transition-colors hover:bg-toySky"
                    >
                      <Pencil className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </button>
                  }
                />
                <button
                  type="button"
                  aria-label={`Eliminar ${product.name}`}
                  onClick={() => handleDelete(product)}
                  className="grid h-9 w-9 place-items-center rounded-lg border-2 border-toyInk bg-white transition-colors hover:bg-toyCoral"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}