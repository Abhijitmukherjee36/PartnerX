import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("Demo User");
  const [bio, setBio] = useState(
    "Love traveling, events, and meeting new people."
  );
  const [location, setLocation] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Profile</h1>

      {/* Profile Picture */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold">
          {name[0]}
        </div>

        <button className="border border-slate-700 px-4 py-2 rounded-lg hover:border-primary transition">
          Change Photo
        </button>
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label className="text-sm text-slate-400">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Bio */}
      <div className="space-y-1">
        <label className="text-sm text-slate-400">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Location */}
      <div className="space-y-1">
        <label className="text-sm text-slate-400">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, Country"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Photo Gallery */}
      <div className="space-y-2">
        <label className="text-sm text-slate-400">Photos</label>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          <div className="h-20 sm:h-24 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-xl cursor-pointer hover:bg-slate-700 transition">
            +
          </div>
          <div className="h-20 sm:h-24 bg-slate-800 rounded-lg" />
          <div className="h-20 sm:h-24 bg-slate-800 rounded-lg" />
          <div className="h-20 sm:h-24 bg-slate-800 rounded-lg hidden sm:block" />
        </div>

        <p className="text-xs text-slate-500">
          Add photos to increase trust and visibility.
        </p>
      </div>

      {/* Save */}
      <button
        onClick={() => {
          // Save user profile data (name, bio, location)
          const profileData = { name, bio, location };
          console.log("Profile saved:", profileData);
          localStorage.setItem("userProfile", JSON.stringify(profileData));
          setSaveMessage("Profile saved successfully!");
          setTimeout(() => setSaveMessage(""), 3000);
        }}
        className="bg-primary px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
      >
        Save Changes
      </button>
      {saveMessage && <p className="text-green-400 text-sm">{saveMessage}</p>}
    </div>
  );
}
