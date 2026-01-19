import { useState } from "react";

export default function DiscoveryCard({ name, intent, bio, location, rating }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-850 border border-slate-700 hover:border-primary/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center text-lg font-bold text-white shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-110">
            {name[0]}
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-slate-100 group-hover:text-primary transition">
              {name}
            </h3>
            <p className="text-xs text-primary font-semibold bg-primary/10 w-fit px-2 py-1 rounded-full mt-1">
              {intent}
            </p>
          </div>
        </div>
        {rating && (
          <div className="text-right">
            <p className="text-sm font-bold text-amber-400">⭐ {rating}</p>
          </div>
        )}
      </div>

      <p className="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-2">
        {bio}
      </p>

      {location && (
        <p className="mt-3 text-xs text-slate-400 flex items-center gap-1">
          📍 <span className="font-medium text-slate-300">{location}</span>
        </p>
      )}

      <div className="flex gap-2 mt-5">
        <button className="flex-1 bg-linear-to-r from-primary to-purple-600 text-white py-2.5 rounded-lg hover:from-primary hover:to-purple-700 transition-all duration-300 font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 flex items-center justify-center gap-2">
          <span>💬</span>
          <span>Connect</span>
        </button>
        <button
          onClick={handleWishlist}
          className={`px-4 py-2.5 rounded-lg transition-all duration-300 font-semibold text-sm flex items-center justify-center transform hover:scale-110 ${
            isWishlisted
              ? "bg-red-500/20 border border-red-500 text-red-400 shadow-lg shadow-red-500/30"
              : "bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-primary/50"
          }`}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}
