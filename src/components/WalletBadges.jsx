export default function WalletBadges({ showLabel = true, className = '' }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {showLabel && (
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-toyInk/45">Paga con</span>
      )}
      <span className="inline-flex items-center rounded-md border-2 border-toyInk bg-[#742284] px-1.5 py-[3px] text-[10px] font-extrabold uppercase leading-none tracking-[0.08em] text-white">
        Yape
      </span>
      <span className="inline-flex items-center rounded-md border-2 border-toyInk bg-[#00C7BE] px-1.5 py-[3px] text-[10px] font-extrabold uppercase leading-none tracking-[0.08em] text-toyInk">
        Plin
      </span>
    </div>
  );
}