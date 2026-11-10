export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoría">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={`rounded-full border-2 border-toyInk px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em] transition-all duration-200 ${
              isActive
                ? 'bg-toyInk text-white shadow-brutal-sm'
                : 'bg-white text-toyInk hover:-translate-y-0.5 hover:bg-toySun'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}