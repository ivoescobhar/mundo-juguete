const STATS = [
  { value: '240+', label: 'juguetes en curaduría' },
  { value: '18', label: 'marcas independientes' },
  { value: '1:1', label: 'asesoría por WhatsApp' },
];

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
      <div className="grid gap-10 rounded-[32px] border-[3px] border-toyInk bg-toySun p-7 shadow-brutal sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-14">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-toyInk/55">
            Sobre la tienda
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] tracking-[-0.02em] sm:text-4xl lg:text-[3.2rem]">
            Juguetes elegidos uno por uno
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-toyInk/75 sm:text-base">
            Somos una juguetería independiente en Lima. Probamos cada juego con niños reales antes de
            sumarlo al catálogo: si no divierte de verdad, no entra. Trabajamos con marcas que cuidan los
            materiales y con talleres locales que producen en series cortas.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border-[3px] border-toyInk bg-white px-5 py-4 lg:flex lg:items-baseline lg:gap-3"
            >
              <dt className="font-display text-2xl leading-none tracking-[-0.03em]">{stat.value}</dt>
              <dd className="mt-1 text-[10px] font-bold uppercase leading-tight tracking-[0.12em] text-toyInk/50 lg:mt-0">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}