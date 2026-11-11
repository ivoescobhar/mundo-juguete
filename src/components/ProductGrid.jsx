import CategoryFilter from '@/components/CategoryFilter';
import ProductRows from '@/components/ProductRows';

function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-[28px] border-[3px] border-toyInk/15 bg-white p-4 sm:p-5">
      <div className="aspect-square w-full rounded-[20px] bg-toyInk/[0.06]" />
      <div className="mt-4 h-2.5 w-24 rounded-full bg-toyInk/10" />
      <div className="mt-3 h-5 w-3/4 rounded-full bg-toyInk/10" />
      <div className="mt-3 h-2.5 w-full rounded-full bg-toyInk/[0.06]" />
      <div className="mt-6 h-8 w-28 rounded-full bg-toyInk/10" />
      <div className="mt-4 h-11 w-full rounded-2xl bg-toyInk/10" />
    </div>
  );
}

export default function ProductGrid({
  products,
  categories,
  activeCategory,
  onCategoryChange,
  totalItems,
  loading,
}) {
  return (
    <section id="catalogo" className="mx-auto max-w-[1200px] px-5 pb-16 pt-6 sm:px-8 lg:pb-24">
      <div className="flex flex-col gap-4 border-b-2 border-toyInk/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-toyInk/50">
            Catálogo
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Todo lo que
            <br className="hidden sm:block" /> estamos jugando
          </h2>
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-toyInk/45 sm:pb-2">
          {totalItems} juguetes · precios en soles
        </p>
      </div>

      <div data-print-hidden className="mt-6">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={onCategoryChange}
        />
      </div>

      {loading ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="mt-8 rounded-[24px] border-[3px] border-dashed border-toyInk/30 bg-white px-6 py-14 text-center">
          <p className="font-display text-lg uppercase">Aún no hay juguetes aquí</p>
          <p className="mt-2 text-sm text-toyInk/60">
            Estamos preparando esta categoría. Explora el catálogo completo mientras tanto.
          </p>
          <button
            type="button"
            onClick={() => onCategoryChange('Todos')}
            className="mt-5 rounded-xl border-[3px] border-toyInk bg-toySun px-5 py-2.5 font-display text-[11px] uppercase tracking-[0.08em]"
          >
            Ver todos
          </button>
        </div>
      ) : (
        <div className="catalog-product-grid mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProductRows products={products} />
        </div>
      )}
    </section>
  );
}