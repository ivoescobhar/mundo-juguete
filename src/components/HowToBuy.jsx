import { MessageCircle, PackageCheck, Sparkles } from 'lucide-react';
import WalletBadges from '@/components/WalletBadges';
import { buildGeneralLink } from '@/lib/whatsapp';

const STEPS = [
  {
    number: '01',
    icon: Sparkles,
    title: 'Elige tu juguete',
    text: 'Filtra por categoría y revisa edad recomendada, descripción y precio de referencia.',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Toca WhatsApp',
    text: 'El mensaje ya sale escrito con el nombre y el SKU del juguete. Solo falta enviarlo.',
  },
  {
    number: '03',
    icon: PackageCheck,
    title: 'Paga y recibe',
    text: 'Confirma stock, paga con Yape o Plin y coordinamos el envío o el recojo en tienda.',
  },
];

export default function HowToBuy() {
  return (
    <section id="como-comprar" className="border-y-[3px] border-toyInk bg-toySky">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-toyInk/50">
              Sin carrito, sin registro
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl uppercase leading-[0.95] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              Comprar toma tres pasos
            </h2>
          </div>
          <a
            href={buildGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-2xl border-[3px] border-toyInk bg-white px-5 py-3 font-display text-[11px] uppercase tracking-[0.08em] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
            Consultar stock
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map(({ number, icon: Icon, title, text }) => (
            <div key={number} className="flex flex-col rounded-[24px] border-[3px] border-toyInk bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl leading-none tracking-[-0.04em] text-toyInk/15">
                  {number}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-xl border-[3px] border-toyInk bg-toyCanvas">
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </div>
              <h3 className="mt-4 font-display text-sm uppercase leading-tight">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-toyInk/65">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border-[3px] border-toyInk bg-toySun px-5 py-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em]">
            Transferencias directas, sin intermediarios
          </p>
          <WalletBadges showLabel={false} />
        </div>
      </div>
    </section>
  );
}