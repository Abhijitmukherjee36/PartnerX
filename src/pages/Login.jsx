import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ ADD THIS

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP: fake login
    login({ name: "Demo User" });

    // ✅ Redirect to intended page or fallback to home
    const redirectTo = location.state?.from || "/home";
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthLayout title="Login to PartnerX">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />

        <button
          type="submit"
          className="w-full bg-primary py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-slate-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
