const WORDS = [
  'Juguetes originales',
  'Yape y Plin',
  'Envíos a todo el Perú',
  'Cambios sin drama',
  'Curaduría semanal',
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((word) => (
        <span key={word} className="flex items-center">
          <span className="px-6 font-display text-[11px] uppercase tracking-[0.16em] sm:text-xs">
            {word}
          </span>
          <span className="text-toySun/70">✳</span>
        </span>
      ))}
    </div>
  );
}

export default function TickerStrip() {
  return (
    <div className="overflow-hidden border-y-[3px] border-toyInk bg-toyInk py-3 text-white">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}