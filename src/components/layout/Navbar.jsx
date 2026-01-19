import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import AvatarMenu from "./AvatarMenu";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Route awareness
  const isLanding = location.pathname === "/";

  const handleLogout = () => {
    navigate("/", { replace: true });
    logout();
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/95 backdrop-blur-sm">
        <Link to="/" className="text-lg sm:text-xl font-bold text-primary">
          PartnerX
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* 🔐 AUTHENTICATED NAVBAR (NOT ON LANDING) */}
          {isAuthenticated && !isLanding && (
            <>
              <Link to="/home" className="hover:text-primary transition text-sm lg:text-base">
                Home
              </Link>

              <Link to="/discover" className="hover:text-primary transition text-sm lg:text-base">
                Discover
              </Link>

              <Link to="/events" className="hover:text-primary transition text-sm lg:text-base">
                Events
              </Link>

              <Link to="/chat" className="hover:text-primary transition text-sm lg:text-base">
                Chat
              </Link>
              <Link to="/safety" className="hover:text-red-400 transition text-sm lg:text-base">
                Safety
              </Link>
            </>
          )}

          {/* 🔓 LOGGED-OUT NAVBAR */}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="hover:text-primary transition">
                Login
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center justify-center bg-primary px-4 py-2 rounded-lg text-white hover:opacity-90 transition"
              >
                Get Started
              </Link>
            </>
          )}

          {/* 👤 USER ACTIONS */}
          {isAuthenticated && <AvatarMenu />}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          {isAuthenticated && <AvatarMenu />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-primary transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-[57px] left-0 right-0 bg-slate-950 border-b border-slate-800 py-4 px-4 shadow-xl">
            <div className="flex flex-col gap-1">
              {/* 🔐 AUTHENTICATED MOBILE NAV */}
              {isAuthenticated && !isLanding && (
                <>
                  <Link 
                    to="/home" 
                    onClick={closeMobileMenu}
                    className="py-3 px-4 rounded-lg hover:bg-slate-800 hover:text-primary transition"
                  >
                    🏠 Home
                  </Link>

                  <Link 
                    to="/discover" 
                    onClick={closeMobileMenu}
                    className="py-3 px-4 rounded-lg hover:bg-slate-800 hover:text-primary transition"
                  >
                    🔍 Discover
                  </Link>

                  <Link 
                    to="/events" 
                    onClick={closeMobileMenu}
                    className="py-3 px-4 rounded-lg hover:bg-slate-800 hover:text-primary transition"
                  >
                    🎉 Events
                  </Link>

                  <Link 
                    to="/chat" 
                    onClick={closeMobileMenu}
                    className="py-3 px-4 rounded-lg hover:bg-slate-800 hover:text-primary transition"
                  >
                    💬 Chat
                  </Link>
                  
                  <Link 
                    to="/safety" 
                    onClick={closeMobileMenu}
                    className="py-3 px-4 rounded-lg hover:bg-slate-800 hover:text-red-400 transition"
                  >
                    🛡️ Safety
                  </Link>
                </>
              )}

              {/* 🔓 LOGGED-OUT MOBILE NAV */}
              {!isAuthenticated && (
                <>
                  <Link 
                    to="/login" 
                    onClick={closeMobileMenu}
                    className="py-3 px-4 rounded-lg hover:bg-slate-800 hover:text-primary transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="mt-2 inline-flex items-center justify-center bg-primary px-4 py-3 rounded-lg text-white hover:opacity-90 transition"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

