import { formatPrice } from '@/lib/format';
import { initialsOf } from '@/lib/catalogPdf';

export default function PdfProductCard({ product, imageUrl, accent, minHeight = 0 }) {
  return (
    <div
      className="catalog-product-card flex w-full flex-col overflow-hidden rounded-[22px] border-[3px] border-toyInk bg-white"
      style={{ minHeight }}
    >
      <div
        className={`catalog-product-image shrink-0 border-b-[3px] border-toyInk ${accent}`}
        style={{
          height: 148,
          backgroundImage: imageUrl ? `url("${imageUrl}")` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!imageUrl && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display uppercase text-toyInk/40" style={{ fontSize: 26 }}>
              {initialsOf(product.name)}
            </span>
          </div>
        )}
      </div>

      <div className="catalog-product-body flex flex-1 flex-col px-3 pb-3 pt-[11px]">
        <p className="catalog-product-meta text-[8.5px] font-extrabold uppercase leading-none tracking-[0.13em] text-toyInk/45">
          {[product.sku, product.age_range, product.category].filter(Boolean).join(' · ')}
        </p>

        <p
          className="catalog-product-name mt-[5px] font-display uppercase leading-[1.05] tracking-[-0.01em]"
          style={{ fontSize: 15 }}
        >
          {product.name}
        </p>

        {product.description?.trim() && (
          <p className="catalog-product-description mt-[5px] leading-[1.45] text-toyInk/60" style={{ fontSize: 9.5 }}>
            {product.description}
          </p>
        )}

        <div className="catalog-product-price mt-auto flex items-end justify-between pt-[10px]">
          <div>
            <p className="text-[7.5px] font-bold uppercase leading-none tracking-[0.14em] text-toyInk/40">
              Precio
            </p>
            <p className="mt-[3px] font-display leading-none" style={{ fontSize: 20 }}>
              S/ {formatPrice(product.price)}
            </p>
          </div>
          <span className="rounded-full border-2 border-toyInk bg-toySun px-2 py-[3px] text-[7.5px] font-extrabold uppercase leading-none tracking-[0.1em]">
            WhatsApp
          </span>
        </div>
      </div>
    </div>
  );
}