import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  // ✅ Allow landing page for logged-out users
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
