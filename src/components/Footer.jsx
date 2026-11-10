import { Link } from 'react-router-dom';
import { Clock, Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import { SITE } from '@/data/siteConfig';
import { buildGeneralLink } from '@/lib/whatsapp';
import WalletBadges from '@/components/WalletBadges';

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-toyInk bg-toyInk text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <p className="font-display text-2xl uppercase leading-[0.95] tracking-[-0.02em] sm:text-3xl">
              Mundo
              <br />
              Juguete
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {SITE.tagline}. Juguetes elegidos con criterio, entregados con cariño.
            </p>
            <WalletBadges className="mt-5" showLabel={false} />
          </div>

          <nav aria-label="Enlaces del pie">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/40">
              Tienda
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#catalogo" className="text-white/70 transition-colors hover:text-toySun">
                  Catálogo completo
                </a>
              </li>
              <li>
                <a href="#como-comprar" className="text-white/70 transition-colors hover:text-toySun">
                  Cómo comprar
                </a>
              </li>
              <li>
                <a href="#preguntas" className="text-white/70 transition-colors hover:text-toySun">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/40">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={buildGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-white/70 transition-colors hover:text-toySun"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
                  Escríbenos por WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 text-white/70 transition-colors hover:text-toySun"
                >
                  <Mail className="h-4 w-4" strokeWidth={2.5} />
                  {SITE.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/70">
                <MapPin className="h-4 w-4" strokeWidth={2.5} />
                {SITE.city}
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/70">
                <Clock className="h-4 w-4" strokeWidth={2.5} />
                {SITE.hours}
              </li>
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-white/70 transition-colors hover:text-toySun"
                >
                  <Instagram className="h-4 w-4" strokeWidth={2.5} />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mundo Juguete</p>
          <div className="flex items-center gap-4">
            <p>Hecho con juego en Lima, Perú</p>
            <Link to="/panel" className="transition-colors hover:text-toySun">
              Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}