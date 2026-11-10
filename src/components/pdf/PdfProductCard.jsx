import { formatPrice } from '@/lib/format';
import { initialsOf } from '@/lib/catalogPdf';

export default function PdfProductCard({ product, imageUrl, accent }) {
  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[22px] border-[3px] border-toyInk bg-white"
      style={{ height: 282 }}
    >
      <div
        className={`shrink-0 border-b-[3px] border-toyInk ${accent}`}
        style={{
          height: 140,
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

      <div className="flex flex-1 flex-col px-3 pb-[11px] pt-[10px]">
        <p className="overflow-hidden text-[8.5px] font-extrabold uppercase leading-none tracking-[0.13em] text-toyInk/45">
          {[product.sku, product.age_range, product.category].filter(Boolean).join(' · ')}
        </p>

        <p
          className="mt-[5px] overflow-hidden font-display uppercase leading-[1.05] tracking-[-0.01em]"
          style={{ fontSize: 15, height: 34 }}
        >
          {product.name}
        </p>

        <p
          className="mt-[5px] overflow-hidden leading-[1.4] text-toyInk/60"
          style={{ fontSize: 9.5, height: 28 }}
        >
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-[7.5px] font-bold uppercase leading-none tracking-[0.14em] text-toyInk/40">
              Precio
            </p>
            <p className="mt-[3px] font-display leading-none" style={{ fontSize: 20 }}>
              S/ {formatPrice(product.price)}
            </p>
          </div>
          <span
            className="rounded-full border-2 border-toyInk bg-toySun px-2 py-[3px] text-[7.5px] font-extrabold uppercase leading-none tracking-[0.1em]"
          >
            WhatsApp
          </span>
        </div>
      </div>
    </div>
  );
}