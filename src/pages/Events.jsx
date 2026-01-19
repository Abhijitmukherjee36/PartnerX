import { useState } from "react";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchLocation, setSearchLocation] = useState("");
  const [wishlistedEvents, setWishlistedEvents] = useState({});

  const UPCOMING_EVENTS = [
    {
      id: 1,
      title: "Sunburn Goa Music Festival",
      date: "January 25-27, 2026",
      location: "Goa",
      attendees: 2500,
      rating: 4.9,
      category: "Music Festival",
      description: "Experience the largest electronic music festival in Asia with world-class artists and performances.",
      price: "₹3,500",
    },
    {
      id: 2,
      title: "Bangalore Tech Meetup",
      date: "January 20, 2026",
      location: "Bangalore",
      attendees: 150,
      rating: 4.6,
      category: "Tech",
      description: "Connect with tech enthusiasts and learn about the latest innovations in software development.",
      price: "Free",
    },
    {
      id: 3,
      title: "Mumbai Street Food Trail",
      date: "January 22, 2026",
      location: "Mumbai",
      attendees: 85,
      rating: 4.8,
      category: "Food & Culture",
      description: "Explore the best street food joints in Mumbai and taste authentic local cuisine.",
      price: "₹1,200",
    },
    {
      id: 4,
      title: "Delhi Marathon 2026",
      date: "January 29, 2026",
      location: "Delhi",
      attendees: 5000,
      rating: 4.7,
      category: "Sports",
      description: "Join thousands of runners in India's premier marathon event through the heart of Delhi.",
      price: "₹500",
    },
    {
      id: 5,
      title: "Kolkata Art Exhibition",
      date: "January 24 - February 10, 2026",
      location: "Kolkata",
      attendees: 300,
      rating: 4.5,
      category: "Art & Culture",
      description: "Discover contemporary and classical art works from renowned and emerging artists.",
      price: "₹800",
    },
    {
      id: 6,
      title: "Pune Hiking Expedition",
      date: "January 23, 2026",
      location: "Pune",
      attendees: 120,
      rating: 4.8,
      category: "Adventure",
      description: "Trek through scenic mountain trails and experience the beauty of Western Ghats.",
      price: "₹2,000",
    },
    {
      id: 7,
      title: "Hyderabad Photography Workshop",
      date: "January 26, 2026",
      location: "Hyderabad",
      attendees: 45,
      rating: 4.7,
      category: "Workshop",
      description: "Master professional photography techniques with industry experts.",
      price: "₹1,500",
    },
    {
      id: 8,
      title: "Chennai Yoga Retreat",
      date: "January 28-30, 2026",
      location: "Chennai",
      attendees: 200,
      rating: 4.9,
      category: "Wellness",
      description: "Transform your mind and body with a 3-day intensive yoga retreat by the beach.",
      price: "₹4,000",
    },
    {
      id: 9,
      title: "Jaipur Heritage Walking Tour",
      date: "January 21, 2026",
      location: "Jaipur",
      attendees: 60,
      rating: 4.6,
      category: "Travel & Culture",
      description: "Explore the architectural wonders and rich history of the Pink City.",
      price: "₹600",
    },
  ];

  const categories = [
    "All",
    "Music Festival",
    "Tech",
    "Food & Culture",
    "Sports",
    "Art & Culture",
    "Adventure",
    "Workshop",
    "Wellness",
    "Travel & Culture",
  ];

  const filteredEvents = UPCOMING_EVENTS.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesLocation =
      !searchLocation.trim() ||
      event.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesCategory && matchesLocation;
  });

  const getCategoryColor = (category) => {
    const colors = {
      "Music Festival": "from-purple-600 to-pink-600",
      Tech: "from-blue-600 to-cyan-600",
      "Food & Culture": "from-orange-600 to-yellow-600",
      Sports: "from-green-600 to-emerald-600",
      "Art & Culture": "from-pink-600 to-rose-600",
      Adventure: "from-red-600 to-orange-600",
      Workshop: "from-indigo-600 to-blue-600",
      Wellness: "from-teal-600 to-green-600",
      "Travel & Culture": "from-amber-600 to-orange-600",
    };
    return colors[category] || "from-primary to-purple-600";
  };

  const toggleWishlist = (eventId) => {
    setWishlistedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-purple-600/10 to-primary/10"></div>
        <div className="absolute top-0 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-purple-600/20 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-linear-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
              Events
            </h1>
            <p className="text-base sm:text-lg text-slate-400 font-medium max-w-md">
              Discover and join exciting events happening around you
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 sm:mb-8">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="flex-1 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-2.5 sm:py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:bg-slate-800/60 transition-all duration-300 text-sm sm:text-base"
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-6 sm:mb-8 overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex gap-2 pb-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium whitespace-nowrap transition-all duration-300 text-xs sm:text-sm ${
                  selectedCategory === category
                    ? `bg-linear-to-r ${getCategoryColor(category)} text-white shadow-lg`
                    : "bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:bg-slate-800/60 hover:border-primary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-linear-to-br from-slate-800 to-slate-850 border border-slate-700 hover:border-primary/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group cursor-pointer"
              >
                {/* Category Badge and Wishlist */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`bg-linear-to-r ${getCategoryColor(event.category)} bg-clip-text text-transparent font-bold text-xs px-2 sm:px-3 py-1 rounded-full border border-primary/30`}>
                    {event.category}
                  </div>
                  <button
                    onClick={() => toggleWishlist(event.id)}
                    className={`transition-all duration-300 transform hover:scale-110 ${
                      wishlistedEvents[event.id]
                        ? "text-red-400 text-lg"
                        : "text-slate-400 text-lg hover:text-primary"
                    }`}
                  >
                    {wishlistedEvents[event.id] ? "❤️" : "🤍"}
                  </button>
                </div>

                {/* Event Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-primary transition">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Rating */}
                {event.rating && (
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="text-amber-400 font-semibold text-sm">
                      ⭐ {event.rating}
                    </span>
                    <span className="text-slate-500 text-xs">({event.attendees} attending)</span>
                  </div>
                )}

                {/* Event Details */}
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm text-slate-400">
                  <p className="flex items-center gap-2">
                    <span>📅</span>
                    <span className="truncate">{event.date}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </p>
                  {event.price && (
                    <p className="flex items-center gap-2">
                      <span>💰</span>
                      <span className="font-semibold text-primary">{event.price}</span>
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-300 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm hover:bg-slate-700 hover:border-primary/50 transition-all duration-300">
                    Details
                  </button>
                  <button
                    onClick={() => alert(`Successfully joined ${event.title}!`)}
                    className="flex-1 bg-linear-to-r from-primary to-purple-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl text-slate-400 font-semibold">No events found</p>
            <p className="text-sm text-slate-500 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
