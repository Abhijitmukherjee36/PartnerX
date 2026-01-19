export default function Filters({ searchLocation, onSearch }) {
  const handleSearch = () => {
    onSearch(searchLocation);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mt-8">
      <div className="relative w-full">
        <input
          placeholder="Search location..."
          value={searchLocation}
          onChange={(e) => onSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg pl-4 pr-16 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition placeholder:text-slate-500 font-medium text-slate-200 hover:border-slate-600/50"
        />
        <button
          onClick={handleSearch}
          type="button"
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3.5 py-2.5 rounded-lg text-base font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50 shadow-md shadow-blue-600/40 z-50 pointer-events-auto border border-blue-500/50 hover:border-blue-400"
        >
          🔎
        </button>
      </div>
    </div>
  );
}
