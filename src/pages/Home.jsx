import PostComposer from "../components/feed/PostComposer";
import FeedPost from "../components/feed/FeedPost";
import Events from "../components/events/Events";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Aarav",
    authorId: 101,
    content: "Looking for people to join me for Sunburn Goa this weekend 🎶",
    likes: 12,
    comments: 4,
    image: null,
  },
  {
    id: 2,
    author: "Riya",
    authorId: 102,
    content: "Anyone interested in a short trek near Bangalore?",
    likes: 8,
    comments: 2,
    image: null,
  },
];

const SUGGESTED_PROFILES = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Goa",
    interests: ["Travel", "Adventure"],
    followers: 2345,
    avatar: "P",
  },
  {
    id: 2,
    name: "Arjun Singh",
    location: "Bangalore",
    interests: ["Tech", "Hiking"],
    followers: 1890,
    avatar: "A",
  },
  {
    id: 3,
    name: "Sneha Verma",
    location: "Delhi",
    interests: ["Food", "Events"],
    followers: 3120,
    avatar: "S",
  },
  {
    id: 4,
    name: "Rohan Patel",
    location: "Mumbai",
    interests: ["Music", "Clubbing"],
    followers: 2876,
    avatar: "R",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [followedProfiles, setFollowedProfiles] = useState([]);

  const handlePostCreate = ({ content, image, location, mood, occasion }) => {
    const newPost = {
      id: posts.length + 1,
      author: "You",
      content: content,
      likes: 0,
      comments: 0,
      image: image,
      location: location,
      mood: mood,
      occasion: occasion,
    };
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleFollowProfile = (profileId) => {
    if (followedProfiles.includes(profileId)) {
      setFollowedProfiles(followedProfiles.filter((id) => id !== profileId));
    } else {
      setFollowedProfiles([...followedProfiles, profileId]);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-950 overflow-hidden">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-12 h-full gap-4 px-3 md:px-4 py-4">
        {/* Left Partition - Profile Suggestions */}
        <div className="hidden md:flex md:col-span-2 flex-col bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
          <div className="sticky top-0 z-20 bg-linear-to-r from-primary/20 to-slate-900 border-b border-primary/30 px-4 py-3 backdrop-blur-sm">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="text-xl">👥</span>
              <span>Suggestions</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">People you might like</p>
          </div>
          <div className="overflow-y-auto hide-scrollbar flex-1 p-3 space-y-3">
            {SUGGESTED_PROFILES.map((profile) => (
              <div
                key={profile.id}
                className="bg-linear-to-br from-slate-800 to-slate-850 hover:from-slate-750 hover:to-slate-800 rounded-xl p-4 transition duration-300 border border-slate-700 hover:border-primary/50 shadow-lg hover:shadow-primary/20 group cursor-pointer"
              >
                {/* Profile Header with Avatar */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    onClick={() => navigate(`/profile`)}
                    className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white text-lg hover:scale-110 transition-transform duration-300 shrink-0 shadow-lg group-hover:shadow-primary/50"
                  >
                    {profile.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      onClick={() => navigate(`/profile`)}
                      className="text-sm font-bold text-slate-100 hover:text-primary cursor-pointer truncate group-hover:text-primary transition"
                    >
                      {profile.name}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      📍 <span className="truncate">{profile.location}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span>👥</span>
                      <span className="font-semibold text-primary">
                        {profile.followers.toLocaleString()}
                      </span>
                      <span>followers</span>
                    </p>
                  </div>
                </div>

                {/* Interests Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="text-xs bg-linear-to-r from-primary/30 to-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/30 hover:border-primary transition"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Follow Button */}
                <button
                  onClick={() => handleFollowProfile(profile.id)}
                  className={`w-full text-xs py-2.5 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2 ${
                    followedProfiles.includes(profile.id)
                      ? "bg-linear-to-r from-primary/30 to-primary/10 text-primary border-2 border-primary hover:from-primary/40 hover:to-primary/20 shadow-lg shadow-primary/20"
                      : "bg-linear-to-r from-primary to-purple-600 text-white hover:from-primary hover:to-purple-700 shadow-lg shadow-primary/30 hover:shadow-primary/50"
                  }`}
                >
                  {followedProfiles.includes(profile.id) ? (
                    <>
                      <span>✓</span>
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <span>+</span>
                      <span>Follow</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Partition - Feed (Wider) */}
        <div className="col-span-1 md:col-span-7 flex flex-col overflow-hidden">
          <div className="overflow-y-auto hide-scrollbar">
            <PostComposer onPostCreate={handlePostCreate} />
            <div className="space-y-5 mt-6">
              {posts.map((post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  onDeletePost={handleDeletePost}
                  followedProfiles={followedProfiles}
                  onFollowProfile={handleFollowProfile}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Partition - Events */}
        <div className="hidden lg:flex lg:col-span-3 flex-col bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-hidden">
          <div className="overflow-y-auto hide-scrollbar flex flex-col">
            <Events onViewAll={() => navigate("/events")} />
          </div>
        </div>
      </div>
    </div>
  );
}
