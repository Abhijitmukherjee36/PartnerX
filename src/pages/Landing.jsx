import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Find the <span className="text-primary">Right People</span> for the
          Right Moment
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-400 px-2">
          Discover verified partners for travel, events, clubbing, co-living,
          and more — safely and transparently.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link
            to="/login"
            className="bg-primary border border-primary px-5 sm:px-6 py-3 rounded-xl text-white font-medium hover:opacity-90 transition"
          >
            Get Started
          </Link>

          <Link
            to="/discover"
            className="border border-slate-700 px-5 sm:px-6 py-3 rounded-xl hover:border-primary transition"
          >
            Explore
          </Link>
        </div>
      </div>
    </section>
  );
}
