import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";

export default function Signup() {
  return (
    <AuthLayout title="Create your account">
      <form className="space-y-4">
        <Input label="Full Name" placeholder="John Doe" />
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />

        <button
          type="submit"
          className="w-full bg-primary py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
