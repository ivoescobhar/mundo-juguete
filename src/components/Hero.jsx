import { Image } from '@/components/ui/image';
import { ArrowDown, MessageCircle, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '@/data/products';
import { buildGeneralLink } from '@/lib/whatsapp';

const STATS = [
  { value: '+240', label: 'juguetes curados' },
  { value: '24-48h', label: 'envío en Lima' },
  { value: '7 días', label: 'para cambiar' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-10 sm:pt-14 lg:pb-24 lg:pt-16">
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-toySky/50 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-toyInk bg-white px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
            Curaduría lúdica · Lima, Perú
          </span>

          <h1 className="mt-5 font-display uppercase leading-[0.88] tracking-[-0.025em] text-[13.5vw] sm:text-6xl lg:text-[5.1rem]">
            El juego
            <br />
            es un{' '}
            <span className="relative inline-block">
              <span className="relative z-10">mundo</span>
              <span className="absolute inset-x-[-2%] bottom-[0.08em] z-0 h-[0.3em] rounded-sm bg-toySun" />
            </span>
            <br />
            serio.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-toyInk/70 sm:text-lg">
            Juguetes que despiertan curiosidad: diseño honesto, materiales nobles y precios claros. Elige tu
            favorito y coordina todo por WhatsApp en un solo mensaje.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-[3px] border-toyInk bg-toySun px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.08em] shadow-brutal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Ver catálogo
              <ArrowDown className="h-4 w-4" strokeWidth={3} />
            </a>
            <a
              href={buildGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-[3px] border-toyInk bg-white px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.08em] transition-all duration-200 hover:-translate-y-0.5 hover:bg-toySky"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
              Escríbenos
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t-2 border-dashed border-toyInk/15 pt-5">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-lg leading-none">{stat.value}</dt>
                <dd className="mt-1.5 text-[10px] font-bold uppercase leading-tight tracking-[0.1em] text-toyInk/45">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="rounded-[36px] border-[3px] border-toyInk bg-toySky p-3 shadow-brutal-lg sm:p-4">
            <div className="overflow-hidden rounded-[26px] border-2 border-toyInk bg-white">
              <Image
                src={HERO_IMAGE}
                alt="Selección de juguetes de Mundo Juguete sobre fondo amarillo"
                className="aspect-square w-full"
                fittingType="fill"
              />
            </div>
          </div>

          <span className="absolute -right-2 -top-4 rotate-6 rounded-2xl border-[3px] border-toyInk bg-toySun px-4 py-2 font-display text-[11px] uppercase tracking-[0.1em] shadow-brutal-sm sm:-right-4">
            Drop 001
          </span>

          <div className="absolute -bottom-5 left-2 flex items-center gap-3 rounded-2xl border-[3px] border-toyInk bg-white px-4 py-3 shadow-brutal sm:left-6">
            <span className="grid h-9 w-9 place-items-center rounded-xl border-2 border-toyInk bg-toyMint font-display text-xs">
              24h
            </span>
            <span className="text-[10px] font-bold uppercase leading-tight tracking-[0.1em]">
              Envío gratis
              <br />
              desde S/ 150
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}