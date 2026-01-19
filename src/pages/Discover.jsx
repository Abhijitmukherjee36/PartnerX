import { useState } from "react";
import SectorTabs from "../components/discovery/SectorTabs";
import Filters from "../components/discovery/Filters";
import DiscoveryCard from "../components/discovery/DiscoveryCard";

const MOCK_USERS = [
  {
    name: "Aarav",
    intent: "Travel Partner",
    bio: "Looking for someone to explore Goa with next month.",
    location: "Goa",
    rating: 4.8,
  },
  {
    name: "Riya",
    intent: "Clubbing Partner",
    bio: "Weekend clubbing, good vibes only.",
    location: "Bangalore",
    rating: 4.9,
  },
  {
    name: "Kabir",
    intent: "Co-living",
    bio: "Searching for a flatmate near HSR Layout.",
    location: "Bangalore",
    rating: 4.7,
  },
  {
    name: "Priya",
    intent: "Fitness Partner",
    bio: "Gym enthusiast looking for workout buddies.",
    location: "Mumbai",
    rating: 4.8,
  },
  {
    name: "Arjun",
    intent: "Adventure Partner",
    bio: "Love hiking and trekking, let's explore together!",
    location: "Dehradun",
    rating: 4.9,
  },
  {
    name: "Sneha",
    intent: "Food Buddy",
    bio: "Foodie exploring hidden gems in the city.",
    location: "Delhi",
    rating: 4.6,
  },
  {
    name: "Rohan",
    intent: "Travel Partner",
    bio: "International travel planner, need a travel mate.",
    location: "Pune",
    rating: 4.8,
  },
  {
    name: "Divya",
    intent: "Study Partner",
    bio: "Preparing for competitive exams, need a study group.",
    location: "Hyderabad",
    rating: 4.7,
  },
  {
    name: "Vikram",
    intent: "Sports Partner",
    bio: "Cricket and badminton player.",
    location: "Chennai",
    rating: 4.9,
  },
];

export default function Discover() {
  const [activeSector, setActiveSector] = useState("All");
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);

  const handleSearch = (location) => {
    setSearchLocation(location);
    filterUsers(activeSector, location);
  };

  const filterUsers = (sector, location) => {
    let filtered = MOCK_USERS;

    // Filter by sector/intent
    if (sector !== "All") {
      filtered = filtered.filter((user) =>
        user.intent.toLowerCase().includes(sector.toLowerCase())
      );
    }

    // Filter by location
    if (location.trim()) {
      filtered = filtered.filter((user) =>
        user.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const handleSectorChange = (sector) => {
    setActiveSector(sector);
    filterUsers(sector, searchLocation);
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
              Discover
            </h1>
            <p className="text-base sm:text-lg text-slate-400 font-medium max-w-md">
              Find your perfect partner for any occasion
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <SectorTabs active={activeSector} onChange={handleSectorChange} />
        <Filters searchLocation={searchLocation} onSearch={handleSearch} />

        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {filteredUsers.map((user, idx) => (
              <DiscoveryCard key={idx} {...user} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl text-slate-400 font-semibold">
              No users found
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Try adjusting your filters
            </p>
          </div>
        )}

        {/* Load More Section */}
        {filteredUsers.length > 0 && (
          <div className="flex justify-center mt-12">
            <button className="bg-linear-to-r from-primary to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary hover:to-purple-700 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50">
              Load More Users
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
