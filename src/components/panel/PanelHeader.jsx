import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PanelHeader({ backTo, title, subtitle, children }) {
  return (
    <header className="border-b-[3px] border-toyInk bg-white">
      <div className="mx-auto flex max-w-[1040px] flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-start gap-3">
          {backTo && (
            <Link
              to={backTo}
              aria-label="Volver"
              className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 border-toyInk bg-toySun transition-transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.8} />
            </Link>
          )}
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-toyInk/40">
              Panel del catálogo
            </p>
            <h1 className="mt-1.5 font-display text-xl uppercase leading-none sm:text-2xl">{title}</h1>
            {subtitle && <p className="mt-1.5 text-xs leading-relaxed text-toyInk/55">{subtitle}</p>}
          </div>
        </div>
        {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
      </div>
    </header>
  );
}