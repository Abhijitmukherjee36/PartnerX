export default function Events({ onViewAll }) {
  const UPCOMING_EVENTS = [
    {
      id: 1,
      title: "Sunburn Goa Music Festival",
      date: "January 25-27, 2026",
      location: "Goa",
      attendees: 2500,
      category: "Music Festival",
    },
    {
      id: 2,
      title: "Bangalore Tech Meetup",
      date: "January 20, 2026",
      location: "Bangalore",
      attendees: 150,
      category: "Tech",
    },
    {
      id: 3,
      title: "Mumbai Street Food Trail",
      date: "January 22, 2026",
      location: "Mumbai",
      attendees: 85,
      category: "Food & Culture",
    },
    {
      id: 4,
      title: "Delhi Marathon 2026",
      date: "January 29, 2026",
      location: "Delhi",
      attendees: 5000,
      category: "Sports",
    },
    {
      id: 5,
      title: "Kolkata Art Exhibition",
      date: "January 24 - February 10, 2026",
      location: "Kolkata",
      attendees: 300,
      category: "Art & Culture",
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Music Festival":
        "bg-gradient-to-r from-purple-500/30 to-purple-500/10 text-purple-300 border border-purple-500/30 hover:border-purple-500",
      Tech: "bg-gradient-to-r from-blue-500/30 to-blue-500/10 text-blue-300 border border-blue-500/30 hover:border-blue-500",
      "Food & Culture":
        "bg-gradient-to-r from-orange-500/30 to-orange-500/10 text-orange-300 border border-orange-500/30 hover:border-orange-500",
      Sports:
        "bg-gradient-to-r from-green-500/30 to-green-500/10 text-green-300 border border-green-500/30 hover:border-green-500",
      "Art & Culture":
        "bg-gradient-to-r from-pink-500/30 to-pink-500/10 text-pink-300 border border-pink-500/30 hover:border-pink-500",
    };
    return (
      colors[category] ||
      "bg-gradient-to-r from-slate-800 to-slate-850 text-slate-300 border border-slate-700 hover:border-primary/50"
    );
  };

  return (
    <div className="h-full flex flex-col">
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <h2 className="text-xl font-bold mb-6 sticky top-0 z-20 bg-linear-to-r from-primary/20 to-slate-900 backdrop-blur-sm border-b border-primary/30 py-4 px-2 rounded-t-lg">
        📅 Upcoming Events
      </h2>

      <div className="space-y-4 overflow-y-auto pr-2 hide-scrollbar">
        {UPCOMING_EVENTS.map((event) => (
          <div
            key={event.id}
            className="bg-linear-to-br from-slate-800 to-slate-850 border border-slate-700 hover:border-primary/50 rounded-xl p-4 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20 group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-bold text-sm line-clamp-2 text-slate-100 group-hover:text-primary transition">
                {event.title}
              </h3>
            </div>

            <p className="text-xs text-slate-400 mb-2 font-medium">
              {event.date}
            </p>

            <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
              📍 <span className="font-medium">{event.location}</span>
            </p>

            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                className={`text-xs px-3 py-1.5 rounded-full transition ${getCategoryColor(
                  event.category
                )}`}
              >
                {event.category}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                👥{" "}
                <span className="text-primary font-semibold">
                  {event.attendees}
                </span>
              </span>
            </div>

            <button className="mt-3 w-full bg-linear-to-r from-primary/30 to-primary/10 border-2 border-primary text-primary py-2 rounded-lg text-xs font-semibold hover:from-primary/40 hover:to-primary/20 transition-all duration-300 shadow-lg shadow-primary/20">
              Learn More
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <button
          onClick={onViewAll}
          className="w-full bg-linear-to-r from-primary to-purple-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:from-primary hover:to-purple-700 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50"
        >
          View All Events
        </button>
      </div>
    </div>
  );
}
