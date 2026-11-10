import { MessageCircle, Smile } from 'lucide-react';
import { buildGeneralLink } from '@/lib/whatsapp';

const LINKS = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Cómo comprar', href: '#como-comprar' },
  { label: 'Preguntas', href: '#preguntas' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-toyInk bg-toyCanvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:h-20 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 -rotate-6 place-items-center rounded-xl border-[3px] border-toyInk bg-toySun transition-transform duration-300 hover:rotate-6">
            <Smile className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-base uppercase leading-none tracking-[-0.02em] sm:text-lg">
            Mundo
            <br />
            Juguete
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-toyInk/70 transition-colors hover:text-toyInk"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={buildGeneralLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border-[3px] border-toyInk bg-toySun px-3.5 py-2.5 font-display text-[10px] uppercase tracking-[0.08em] shadow-brutal-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:px-4 sm:py-3 sm:text-[11px]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="sm:hidden">Pedir</span>
        </a>
      </div>
    </header>
  );
}