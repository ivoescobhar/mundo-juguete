import PdfProductCard from '@/components/pdf/PdfProductCard';

const ACCENTS = ['bg-toySky', 'bg-toySun', 'bg-toyMint', 'bg-toyLilac', 'bg-toyCoral'];

export default function ProductsPage({ seller, items, images, pageNumber, totalPages }) {
  const rows = [];
  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }

  return (
    <div className="flex h-full flex-col px-[44px] pb-[34px] pt-[34px]">
      <div className="flex items-end justify-between border-b-[3px] border-toyInk pb-[11px]">
        <div>
          <p className="text-[8.5px] font-extrabold uppercase tracking-[0.18em] text-toyInk/45">
            {seller.display_name}
          </p>
          <p className="mt-[7px] font-display uppercase leading-none" style={{ fontSize: 19 }}>
            Catálogo de juguetes
          </p>
        </div>
        <p className="font-display leading-none" style={{ fontSize: 12 }}>
          {pageNumber} / {totalPages}
        </p>
      </div>

      <div className="mt-[16px] flex flex-1 flex-col">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex items-stretch -mx-[9px] ${rowIndex > 0 ? 'mt-[18px]' : ''}`}
          >
            {row.map((product, index) => (
              <div key={product.id} className="w-1/2 px-[9px]">
                <PdfProductCard
                  product={product}
                  imageUrl={images[product.image_url] || product.image_url}
                  accent={ACCENTS[(rowIndex * 2 + index) % ACCENTS.length]}
                />
              </div>
            ))}
            {row.length === 1 && <div className="w-1/2 px-[9px]" />}
          </div>
        ))}

        {items.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-[22px] border-[3px] border-dashed border-toyInk/25">
            <p className="font-display uppercase text-toyInk/40" style={{ fontSize: 15 }}>
              Aún no hay juguetes cargados
            </p>
          </div>
        )}
      </div>

      <div className="mt-[16px] flex items-center justify-between border-t-2 border-dashed border-toyInk/15 pt-[10px]">
        <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-toyInk/40">
          Pide por WhatsApp {seller.whatsapp || ''}
        </p>
        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-toyInk/35">
          Precios de referencia
        </p>
      </div>
    </div>
  );
}