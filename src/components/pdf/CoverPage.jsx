import { initialsOf } from '@/lib/catalogPdf';

export default function CoverPage({ seller, productCount, images }) {
  const title = seller.catalog_title || seller.display_name;
  const logoUrl = seller.logo_url ? images[seller.logo_url] || seller.logo_url : '';
  const heroUrl = seller.hero_image_url ? images[seller.hero_image_url] || seller.hero_image_url : '';
  const year = new Date().getFullYear();

  return (
    <div className="flex h-full flex-col px-[46px] py-[42px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {logoUrl ? (
            <div
              className="mr-3 rounded-xl border-[3px] border-toyInk"
              style={{
                width: 46,
                height: 46,
                backgroundImage: `url("${logoUrl}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ) : (
            <div
              className="mr-3 flex items-center justify-center rounded-xl border-[3px] border-toyInk bg-toySun font-display"
              style={{ width: 46, height: 46, fontSize: 17 }}
            >
              {initialsOf(seller.display_name)}
            </div>
          )}
          <div>
            <p className="font-display uppercase leading-none" style={{ fontSize: 16 }}>
              {seller.display_name}
            </p>
            <p className="mt-[7px] text-[8.5px] font-extrabold uppercase tracking-[0.16em] text-toyInk/45">
              Catálogo {year}
            </p>
          </div>
        </div>
        <span className="rounded-full border-2 border-toyInk bg-white px-3 py-[5px] text-[8.5px] font-extrabold uppercase tracking-[0.14em]">
          Precios en soles
        </span>
      </div>

      <div className="mt-[26px]">
        <span className="inline-flex rounded-full border-2 border-toyInk bg-toySun px-3 py-[5px] text-[8.5px] font-extrabold uppercase tracking-[0.16em]">
          {seller.tagline || 'Catálogo de juguetes'}
        </span>
        <h1
          className="mt-[16px] font-display uppercase tracking-[-0.02em]"
          style={{ fontSize: 50, lineHeight: 0.92 }}
        >
          {title}
        </h1>
        {seller.catalog_subtitle && (
          <p className="mt-[14px] max-w-[540px] leading-[1.5] text-toyInk/65" style={{ fontSize: 12.5 }}>
            {seller.catalog_subtitle}
          </p>
        )}
      </div>

      <div
        className="mt-[22px] flex-1 overflow-hidden rounded-[26px] border-[3px] border-toyInk bg-toySky"
        style={{
          minHeight: 300,
          backgroundImage: heroUrl ? `url("${heroUrl}")` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!heroUrl && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display uppercase text-toyInk/25" style={{ fontSize: 64 }}>
              {initialsOf(seller.display_name)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-[20px] flex items-stretch rounded-[22px] border-[3px] border-toyInk bg-toyInk px-5 py-4 text-white">
        <div className="w-1/3 pr-3">
          <p className="text-[7.5px] font-extrabold uppercase tracking-[0.16em] text-white/45">WhatsApp</p>
          <p className="mt-[6px] font-display leading-none" style={{ fontSize: 13 }}>
            {seller.whatsapp || 'Agrega tu número'}
          </p>
        </div>
        <div className="w-1/3 border-l border-white/15 px-3">
          <p className="text-[7.5px] font-extrabold uppercase tracking-[0.16em] text-white/45">Instagram</p>
          <p className="mt-[6px] font-display leading-none" style={{ fontSize: 13 }}>
            {seller.instagram || '—'}
          </p>
        </div>
        <div className="w-1/3 border-l border-white/15 pl-3">
          <p className="text-[7.5px] font-extrabold uppercase tracking-[0.16em] text-white/45">Catálogo</p>
          <p className="mt-[6px] font-display leading-none" style={{ fontSize: 13 }}>
            {productCount} juguetes
          </p>
        </div>
      </div>
    </div>
  );
}