export default function SafetySession() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
      <h2 className="font-semibold">Live Safety Session</h2>

      <p className="text-sm text-slate-400">
        Enable a safety session while meeting someone. Your location and
        status will be shared with trusted contacts.
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          Status: <span className="text-yellow-400">Inactive</span>
        </span>

        <button className="border border-slate-700 px-4 py-2 rounded-lg hover:border-primary transition">
          Start Session
        </button>
      </div>
    </div>
  );
}
