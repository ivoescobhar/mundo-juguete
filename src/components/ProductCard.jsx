import { Image } from '@/components/ui/image';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import { buildInquiryLink } from '@/lib/whatsapp';
import WalletBadges from '@/components/WalletBadges';

export default function ProductCard({ product, featured = false }) {
  return (
    <article
      className={`group flex w-full flex-col rounded-[28px] border-[3px] border-toyInk bg-white p-4 shadow-brutal transition-all duration-300 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-5 ${
        featured ? 'lg:col-span-2 lg:flex-row lg:items-stretch lg:gap-7 lg:p-6' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[20px] border-2 border-toyInk bg-toySky ${
          featured ? 'lg:w-1/2 lg:shrink-0' : ''
        }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          className="aspect-square w-full"
          fittingType="fill"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full border-2 border-toyInk bg-toySun px-3 py-1 text-[10px] font-extrabold uppercase leading-none tracking-[0.12em]">
            {product.tag}
          </span>
        )}
      </div>

      <div className={`mt-4 flex flex-1 flex-col ${featured ? 'lg:mt-0 lg:justify-center' : ''}`}>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-toyInk/45">
          <span>{product.sku}</span>
          <span className="h-1 w-1 rounded-full bg-toyInk/25" />
          <span>{product.age}</span>
          <span className="h-1 w-1 rounded-full bg-toyInk/25" />
          <span className="truncate">{product.category}</span>
        </div>

        <h3
          className={`mt-2 font-display uppercase leading-[1.05] tracking-[-0.01em] ${
            featured ? 'text-2xl sm:text-3xl' : 'text-xl'
          }`}
        >
          {product.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-toyInk/65">{product.description}</p>

        <div className="mt-4 flex items-end gap-1.5">
          <span className="pb-1.5 font-display text-sm">S/</span>
          <span className="font-display text-[2.4rem] leading-none tracking-[-0.03em]">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-toyInk/40">
          Precio de referencia
        </p>

        <a
          href={buildInquiryLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-toyInk bg-toySun px-4 py-3.5 font-display text-[11px] uppercase tracking-[0.06em] shadow-brutal-sm transition-all duration-200 hover:bg-[#FFF06A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          Pedir por WhatsApp
          <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />
        </a>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-toyInk/15 pt-3">
          <WalletBadges />
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-toyInk/40">
            Envío 24-48h
          </span>
        </div>
      </div>
    </article>
  );
}