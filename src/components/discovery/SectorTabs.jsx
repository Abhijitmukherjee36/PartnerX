const SECTORS = ["All", "Travel", "Clubbing", "Dating", "Co-living", "Events"];

export default function SectorTabs({ active, onChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      {SECTORS.map((sector) => (
        <button
          key={sector}
          onClick={() => onChange(sector)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap backdrop-blur-sm ${
            active === sector
              ? "bg-linear-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 scale-105"
              : "bg-slate-800/40 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600"
          }`}
        >
          {sector}
        </button>
      ))}
    </div>
  );
}
