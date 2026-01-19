import { useState, useRef } from "react";

export default function PostComposer({ onPostCreate }) {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [showOccasionPicker, setShowOccasionPicker] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const emojis = [
    "😊",
    "😂",
    "😍",
    "🎉",
    "🎸",
    "🏔️",
    "🍽️",
    "✈️",
    "🚗",
    "🏖️",
    "🎭",
    "⛰️",
  ];
  const moods = [
    "😊 Happy",
    "😎 Excited",
    "🥳 Energetic",
    "😌 Calm",
    "😍 Friendly",
    "🤗 Loving",
  ];
  const occasions = [
    "Travel",
    "Adventure",
    "Clubbing",
    "Dining",
    "Events",
    "Co-living",
    "Sports",
    "Party",
  ];
  const popularLocations = [
    "Goa",
    "Bangalore",
    "Delhi",
    "Mumbai",
    "Pune",
    "Kolkata",
    "Hyderabad",
    "Chennai",
  ];

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddEmoji = (emoji) => {
    setPostContent(postContent + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationInput(false);
    setSearchLocation("");
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        setSelectedLocation("📍 Current Location");
        setShowLocationInput(false);
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  const filteredLocations = popularLocations.filter((loc) =>
    loc.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const handlePost = () => {
    if (postContent.trim() || selectedImage) {
      if (onPostCreate) {
        onPostCreate({
          content: postContent,
          image: imagePreview,
          location: selectedLocation,
          mood: selectedMood,
          occasion: selectedOccasion,
        });
      }
      setPostContent("");
      setSelectedImage(null);
      setImagePreview(null);
      setSelectedLocation("");
      setSelectedMood("");
      setSelectedOccasion("");
      setSearchLocation("");
    }
  };

  const isPostEmpty = !postContent.trim() && !selectedImage;

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-850 border border-slate-700 hover:border-primary/50 rounded-2xl p-5 space-y-4 transition-all duration-300 shadow-lg hover:shadow-primary/20">
      {/* Header with Avatar */}
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white text-lg shrink-0 shadow-lg">
          U
        </div>
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Share what you're up to or looking for..."
            className="w-full bg-transparent resize-none outline-none text-sm text-slate-200 placeholder:text-slate-400 font-medium"
            rows={3}
          />
        </div>
      </div>

      {/* Tags Section */}
      <div className="flex flex-wrap gap-2">
        {selectedLocation && (
          <div className="flex items-center gap-2 px-3 py-2 bg-linear-to-r from-primary/30 to-primary/10 text-primary rounded-full border border-primary/30 hover:border-primary transition">
            <span>📍 {selectedLocation}</span>
            <button
              onClick={() => setSelectedLocation("")}
              className="text-primary/60 hover:text-primary transition"
            >
              ✕
            </button>
          </div>
        )}
        {selectedMood && (
          <div className="flex items-center gap-2 px-3 py-2 bg-linear-to-r from-purple-500/30 to-purple-500/10 text-purple-300 rounded-full border border-purple-500/30 hover:border-purple-500 transition">
            <span>{selectedMood}</span>
            <button
              onClick={() => setSelectedMood("")}
              className="text-purple-300/60 hover:text-purple-300 transition"
            >
              ✕
            </button>
          </div>
        )}
        {selectedOccasion && (
          <div className="flex items-center gap-2 px-3 py-2 bg-linear-to-r from-blue-500/30 to-blue-500/10 text-blue-300 rounded-full border border-blue-500/30 hover:border-blue-500 transition">
            <span>🎯 {selectedOccasion}</span>
            <button
              onClick={() => setSelectedOccasion("")}
              className="text-blue-300/60 hover:text-blue-300 transition"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="relative rounded-xl overflow-hidden bg-slate-700/50 border border-slate-600/50 shadow-lg">
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-slate-900/90 hover:bg-slate-900 rounded-full p-2 transition shadow-lg"
          >
            ✕
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
        <div className="flex gap-2 relative">
          {/* Image Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-slate-400 hover:text-primary hover:bg-primary/10 p-2 rounded-lg transition"
            title="Add Image"
          >
            🖼️
          </button>

          {/* Location Button */}
          <div className="relative">
            <button
              onClick={() => setShowLocationInput(!showLocationInput)}
              className="text-slate-400 hover:text-primary hover:bg-primary/10 p-2 rounded-lg transition"
              title="Add Location"
            >
              📍
            </button>
            {showLocationInput && (
              <div className="absolute left-0 top-12 bg-linear-to-br from-slate-800 to-slate-850 border border-slate-700 rounded-lg shadow-lg z-20 w-56">
                <div className="p-3 space-y-3">
                  {/* Get Current Location */}
                  <button
                    onClick={handleGetCurrentLocation}
                    className="w-full text-left px-3 py-2 hover:bg-slate-700/50 rounded text-sm transition flex items-center gap-2 font-medium"
                  >
                    📍 Get Current Location
                  </button>

                  {/* Search Location */}
                  <div>
                    <input
                      type="text"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      placeholder="Search location..."
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    />
                  </div>

                  {/* Location List */}
                  <div className="max-h-40 overflow-y-auto hide-scrollbar space-y-1">
                    {filteredLocations.map((location) => (
                      <button
                        key={location}
                        onClick={() => handleLocationSelect(location)}
                        className="w-full text-left px-3 py-2 hover:bg-slate-700/50 rounded text-sm transition font-medium"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mood Button */}
          <div className="relative">
            <button
              onClick={() => setShowMoodPicker(!showMoodPicker)}
              className="text-slate-400 hover:text-primary hover:bg-primary/10 p-2 rounded-lg transition"
              title="How are you feeling?"
            >
              💭
            </button>
            {showMoodPicker && (
              <div className="absolute left-0 top-12 bg-linear-to-br from-slate-800 to-slate-850 border border-slate-700 rounded-lg shadow-lg z-20 w-48">
                <div className="p-2 space-y-1 max-h-48 overflow-y-auto hide-scrollbar">
                  {moods.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => {
                        setSelectedMood(mood);
                        setShowMoodPicker(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-700/50 rounded text-sm transition font-medium"
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Occasion Button */}
          <div className="relative">
            <button
              onClick={() => setShowOccasionPicker(!showOccasionPicker)}
              className="text-slate-400 hover:text-primary hover:bg-primary/10 p-2 rounded-lg transition"
              title="What occasion?"
            >
              🎯
            </button>
            {showOccasionPicker && (
              <div className="absolute left-0 top-12 bg-linear-to-br from-slate-800 to-slate-850 border border-slate-700 rounded-lg shadow-lg z-20 w-48">
                <div className="p-2 space-y-1 max-h-48 overflow-y-auto hide-scrollbar">
                  {occasions.map((occasion) => (
                    <button
                      key={occasion}
                      onClick={() => {
                        setSelectedOccasion(occasion);
                        setShowOccasionPicker(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-700/50 rounded text-sm transition font-medium"
                    >
                      {occasion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Emoji Picker Button */}
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-slate-400 hover:text-primary hover:bg-primary/10 p-2 rounded-lg transition"
              title="Add Emoji"
            >
              😊
            </button>
            {showEmojiPicker && (
              <div className="absolute left-0 top-12 bg-linear-to-br from-slate-800 to-slate-850 border border-slate-700 rounded-lg shadow-lg z-20 p-3">
                <div className="grid grid-cols-6 gap-2 w-56">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleAddEmoji(emoji)}
                      className="text-2xl hover:bg-slate-700/50 p-2 rounded transition text-center font-semibold"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        <button
          onClick={handlePost}
          disabled={isPostEmpty}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            isPostEmpty
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-linear-to-r from-primary to-purple-600 text-white hover:from-primary hover:to-purple-700 shadow-lg shadow-primary/30 hover:shadow-primary/50"
          }`}
        >
          Post
        </button>
      </div>
    </div>
  );
}
