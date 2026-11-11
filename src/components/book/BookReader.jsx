import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Loader2, X } from 'lucide-react';
import BookPage from '@/components/book/BookPage';
import { PAGE_WIDTH, PAGE_HEIGHT } from '@/lib/pdfExport';

const VARIANTS = {
  enter: (direction) => ({ rotateY: direction > 0 ? -72 : 72, opacity: 0 }),
  center: { rotateY: 0, opacity: 1 },
  exit: (direction) => ({ rotateY: direction > 0 ? 72 : -72, opacity: 0 }),
};

export default function BookReader({ open, pages, seller, images, productPageCount, onClose, onDownload, busy }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [scale, setScale] = useState(0.6);
  const stageRef = useRef(null);

  const total = pages.length;

  const goTo = useCallback(
    (next) => {
      if (!total) return;
      const clamped = Math.min(total - 1, Math.max(0, next));
      setDirection(clamped >= index ? 1 : -1);
      setIndex(clamped);
    },
    [index, total],
  );

  useEffect(() => {
    if (open) {
      setIndex(0);
      setDirection(1);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') goTo(index + 1);
      if (event.key === 'ArrowLeft') goTo(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, goTo, index, onClose]);

  useLayoutEffect(() => {
    if (!open) return undefined;
    const stage = stageRef.current;
    if (!stage) return undefined;

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      const next = Math.min((rect.width - 32) / PAGE_WIDTH, (rect.height - 16) / PAGE_HEIGHT, 1);
      setScale(next > 0 ? next : 0.4);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [open]);

  if (!open || !pages.length) return null;

  const page = pages[index];
  const atStart = index === 0;
  const atEnd = index === total - 1;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-toyInk/95 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/35">Modo libro</p>
          <p className="truncate font-display text-sm uppercase text-white sm:text-base">
            {seller?.display_name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDownload}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">Descargar</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar libro"
            className="grid h-9 w-9 place-items-center rounded-xl border-2 border-toySun bg-toySun text-toyInk transition-transform hover:scale-105"
          >
            <X className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      </div>

      <div ref={stageRef} className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 pb-2">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={atStart}
          aria-label="Página anterior"
          className="absolute left-1 z-20 grid h-11 w-11 place-items-center rounded-full border-2 border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 disabled:opacity-20 sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.6} />
        </button>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={atEnd}
          aria-label="Página siguiente"
          className="absolute right-1 z-20 grid h-11 w-11 place-items-center rounded-full border-2 border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 disabled:opacity-20 sm:right-4"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.6} />
        </button>

        <div style={{ width: PAGE_WIDTH * scale, height: PAGE_HEIGHT * scale, perspective: 2600 }}>
          <div
            className="relative origin-top-left rounded-[2px] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            style={{
              width: PAGE_WIDTH,
              height: PAGE_HEIGHT,
              transform: `scale(${scale})`,
              transformStyle: 'preserve-3d',
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
                style={{
                  transformOrigin: direction > 0 ? 'left center' : 'right center',
                  backfaceVisibility: 'hidden',
                }}
              >
                <BookPage
                  page={page}
                  seller={seller}
                  images={images}
                  productPageCount={productPageCount}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 px-4 pb-5 pt-2">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={atStart}
          className="rounded-xl border-2 border-white/20 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10 disabled:opacity-25"
        >
          Anterior
        </button>
        <p className="min-w-[64px] text-center font-display text-xs uppercase tracking-[0.14em] text-white/70">
          {index + 1} / {total}
        </p>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={atEnd}
          className="rounded-xl border-2 border-toySun bg-toySun px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-toyInk transition-colors hover:bg-[#FFF06A] disabled:opacity-25"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}