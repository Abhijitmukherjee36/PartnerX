import { useState } from "react";

export default function FeedPost({
  post,
  onDeletePost,
  followedProfiles = [],
  onFollowProfile,
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const isFollowed = post.authorId && followedProfiles.includes(post.authorId);
  const isOwnPost = post.author === "You";

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: commentText,
          author: "You",
          time: "now",
        },
      ]);
      setCommentText("");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Check out this post by ${post.author}: "${post.content}"`
    );
    alert("Post link copied to clipboard!");
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-850 border border-slate-700 hover:border-primary/50 rounded-2xl p-5 space-y-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center font-semibold text-white hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg group-hover:shadow-primary/50">
            {post.author[0]}
          </div>
          <div>
            <p className="font-bold text-slate-100 hover:text-primary cursor-pointer transition">
              {post.author}
            </p>
            <p className="text-xs text-slate-400">Just now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Follow Button - Only show if not own post and not followed */}
          {!isOwnPost && !isFollowed && (
            <button
              onClick={() => onFollowProfile && onFollowProfile(post.authorId)}
              className="px-3 py-2 bg-linear-to-r from-primary to-purple-600 text-white text-xs font-semibold rounded-lg hover:from-primary hover:to-purple-700 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 flex items-center gap-1"
            >
              <span>+</span>
              <span>Follow</span>
            </button>
          )}
          {/* Following Badge - Show if followed and make it clickable to unfollow */}
          {!isOwnPost && isFollowed && (
            <button
              onClick={() => onFollowProfile && onFollowProfile(post.authorId)}
              className="px-3 py-2 bg-linear-to-r from-primary/30 to-primary/10 text-primary text-xs font-semibold rounded-lg border-2 border-primary hover:from-primary/40 hover:to-primary/20 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center gap-1"
            >
              <span>✓</span>
              <span>Following</span>
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-slate-400 hover:text-primary hover:bg-primary/10 p-2 rounded-full transition"
            >
              ⋮
            </button>
            {showMenu && (
              <div className="absolute right-0 top-10 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 w-40">
                <button className="w-full text-left px-4 py-2 hover:bg-slate-700 text-sm transition">
                  📌 Pin Post
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-slate-700 text-sm transition">
                  🚫 Report
                </button>
                <button
                  onClick={() => {
                    if (onDeletePost) onDeletePost(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-700 text-sm transition border-t border-slate-700"
                >
                  ❌ Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-slate-200 leading-relaxed">{post.content}</p>

      {/* Post Metadata Tags */}
      <div className="flex flex-wrap gap-2">
        {post.location && (
          <span className="text-xs bg-linear-to-r from-primary/30 to-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/30 hover:border-primary transition">
            📍 {post.location}
          </span>
        )}
        {post.mood && (
          <span className="text-xs bg-linear-to-r from-purple-500/30 to-purple-500/10 text-purple-300 px-2.5 py-1 rounded-full border border-purple-500/30 hover:border-purple-500 transition">
            {post.mood}
          </span>
        )}
        {post.occasion && (
          <span className="text-xs bg-linear-to-r from-blue-500/30 to-blue-500/10 text-blue-300 px-2.5 py-1 rounded-full border border-blue-500/30 hover:border-blue-500 transition">
            🎯 {post.occasion}
          </span>
        )}
      </div>

      {/* Image if exists */}
      {post.image && (
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={post.image}
            alt="post"
            className="w-full h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Stats */}
      <div className="flex gap-6 text-xs text-slate-400 py-3 border-b border-slate-700/50">
        <span className="hover:text-primary cursor-pointer transition font-medium">
          👍 {likeCount} likes
        </span>
        <span className="hover:text-primary cursor-pointer transition font-medium">
          💬 {post.comments + comments.length} comments
        </span>
        <span className="hover:text-primary cursor-pointer transition font-medium">
          📤 {Math.floor(Math.random() * 100)} shares
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 text-sm text-slate-400 py-2">
        <button
          onClick={handleLike}
          className={`flex-1 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
            liked
              ? "bg-linear-to-r from-red-500/30 to-red-500/10 text-red-400 border border-red-500/30"
              : "hover:bg-slate-700/50 hover:text-primary"
          }`}
        >
          <span>{liked ? "❤️" : "🤍"}</span>
          Like
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 py-2.5 rounded-lg hover:bg-slate-700/50 hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 font-medium"
        >
          <span>💬</span>
          Comment
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-2.5 rounded-lg hover:bg-slate-700/50 hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 font-medium"
        >
          <span>📤</span>
          Share
        </button>
        <button
          onClick={handleBookmark}
          className={`flex-1 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
            bookmarked
              ? "bg-linear-to-r from-amber-500/30 to-amber-500/10 text-amber-400 border border-amber-500/30"
              : "hover:bg-slate-700/50 hover:text-primary"
          }`}
        >
          <span>{bookmarked ? "🔖" : "🔗"}</span>
          Save
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-4">
          {/* Comment Input */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center text-xs font-semibold text-white shrink-0 shadow-lg">
              Y
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Add a comment..."
                className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              />
              <button
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className="bg-linear-to-r from-primary to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-primary hover:to-purple-700 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-primary/30"
              >
                Post
              </button>
            </div>
          </div>

          {/* Comments List */}
          {comments.length > 0 && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary/50 to-purple-600/50 flex items-center justify-center text-xs font-semibold text-slate-100 shrink-0">
                    {comment.author[0]}
                  </div>
                  <div className="flex-1 bg-slate-700/30 rounded-lg p-2 border border-slate-600/30">
                    <p className="text-xs font-semibold text-slate-200">
                      {comment.author}
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      {comment.text}
                    </p>
                  </div>
                  <button className="text-slate-500 hover:text-red-400 text-xs transition">
                    🤍
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
