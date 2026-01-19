import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function AvatarMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate("/", { replace: true });
    logout();
  };

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-semibold text-white"
      >
        {user?.name?.[0] || "U"}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden z-50">
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-4 py-2 text-sm hover:bg-slate-800"
          >
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-full text-left px-4 py-2 text-sm hover:bg-slate-800"
          >
            Settings
          </button>

          <div className="border-t border-slate-800" />

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
