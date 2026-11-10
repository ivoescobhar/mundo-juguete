import { ShieldCheck, Truck, Wallet } from 'lucide-react';

const ITEMS = [
  {
    icon: Truck,
    title: 'Envíos a todo el Perú',
    text: 'Lima en 24-48h y provincias en 2-4 días con embalaje reforzado.',
    tone: 'bg-toySky',
  },
  {
    icon: Wallet,
    title: 'Yape, Plin o transferencia',
    text: 'Paga al instante desde tu billetera. Sin comisiones ni formularios largos.',
    tone: 'bg-toySun',
  },
  {
    icon: ShieldCheck,
    title: 'Juguetes verificados',
    text: 'Cada pieza pasa por control de seguridad, piezas pequeñas y pintura apta.',
    tone: 'bg-toyMint',
  },
];

export default function ValueStrip() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ icon: Icon, title, text, tone }) => (
          <div
            key={title}
            className="rounded-[24px] border-[3px] border-toyInk bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className={`grid h-11 w-11 place-items-center rounded-xl border-[3px] border-toyInk ${tone}`}>
              <Icon className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <h3 className="mt-4 font-display text-sm uppercase leading-tight tracking-[-0.01em]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-toyInk/60">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}