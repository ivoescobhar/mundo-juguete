import WalletBadges from '@/components/WalletBadges';

const STEPS = [
  {
    number: '01',
    title: 'Elige tu juguete',
    text: 'Anota el nombre o el SKU de la tarjeta que te gustó.',
    accent: 'bg-toySun',
  },
  {
    number: '02',
    title: 'Escríbenos',
    text: 'Mándanos el código por WhatsApp y confirmamos stock al instante.',
    accent: 'bg-toySky',
  },
  {
    number: '03',
    title: 'Paga y recibe',
    text: 'Coordina el envío y paga con Yape o Plin desde tu celular.',
    accent: 'bg-toyMint',
  },
];

export default function ContactPage({ seller }) {
  return (
    <div className="catalog-print-contact flex h-full flex-col px-[46px] py-[42px]">
      <div className="flex items-center justify-between border-b-[3px] border-toyInk pb-[11px]">
        <p className="text-[8.5px] font-extrabold uppercase tracking-[0.18em] text-toyInk/45">
          {seller.display_name}
        </p>
        <p className="text-[8.5px] font-extrabold uppercase tracking-[0.18em] text-toyInk/45">
          Cómo comprar
        </p>
      </div>

      <h2
        className="mt-[26px] max-w-[560px] font-display uppercase tracking-[-0.02em]"
        style={{ fontSize: 42, lineHeight: 0.94 }}
      >
        Pedir es
        <br />
        muy fácil
      </h2>

      <div className="mt-[24px] flex items-stretch -mx-[8px]">
        {STEPS.map((step) => (
          <div key={step.number} className="w-1/3 px-[8px]">
            <div
              className={`flex h-full flex-col rounded-[20px] border-[3px] border-toyInk ${step.accent} p-4`}
              style={{ minHeight: 168 }}
            >
              <span className="font-display leading-none" style={{ fontSize: 22 }}>
                {step.number}
              </span>
              <p className="mt-[10px] font-display uppercase leading-[1.1]" style={{ fontSize: 12 }}>
                {step.title}
              </p>
              <p className="mt-[7px] leading-[1.45] text-toyInk/70" style={{ fontSize: 9.5 }}>
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[22px] rounded-[24px] border-[3px] border-toyInk bg-toyInk px-6 py-6 text-white">
        <p className="text-[8.5px] font-extrabold uppercase tracking-[0.18em] text-white/45">
          WhatsApp directo
        </p>
        <p className="mt-[10px] font-display leading-none" style={{ fontSize: 34 }}>
          {seller.whatsapp || 'Agrega tu número'}
        </p>
        <p className="mt-[12px] max-w-[430px] leading-[1.5] text-white/60" style={{ fontSize: 10.5 }}>
          Envíanos el nombre del juguete y te confirmamos stock, formas de pago y tiempo de entrega.
        </p>
      </div>

      <div className="mt-[18px] flex items-stretch -mx-[8px]">
        <div className="w-1/2 px-[8px]">
          <div className="h-full rounded-[20px] border-[3px] border-toyInk bg-white px-4 py-4">
            <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-toyInk/40">
              Instagram
            </p>
            <p className="mt-[7px] font-display leading-none" style={{ fontSize: 14 }}>
              {seller.instagram || '—'}
            </p>
            <p className="mt-[8px] text-[9.5px] leading-[1.4] text-toyInk/55">
              Mira los juguetes nuevos antes que nadie.
            </p>
          </div>
        </div>
        <div className="w-1/2 px-[8px]">
          <div className="h-full rounded-[20px] border-[3px] border-toyInk bg-white px-4 py-4">
            <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-toyInk/40">
              Entrega
            </p>
            <p className="mt-[7px] font-display leading-none" style={{ fontSize: 14 }}>
              {seller.city || '—'}
            </p>
            <p className="mt-[8px] text-[9.5px] leading-[1.4] text-toyInk/55">
              {seller.hours || 'Coordina el envío por WhatsApp.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-toyInk/15 pt-[14px]">
        <WalletBadges />
        <p className="max-w-[380px] text-right text-[8px] font-bold uppercase leading-[1.5] tracking-[0.1em] text-toyInk/35">
          {seller.note || 'Precios de referencia. Consulta stock antes de comprar.'}
        </p>
      </div>
    </div>
  );
}