export default function SOSButton() {
  return (
    <div className="bg-red-900/20 border border-red-800 rounded-2xl p-6 text-center">
      <h2 className="text-lg font-semibold text-red-400 mb-2">
        Emergency SOS
      </h2>

      <p className="text-sm text-slate-300 mb-4">
        Press the button below to alert your emergency contacts immediately.
      </p>

      <button className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl text-white font-bold text-lg transition">
        SOS
      </button>
    </div>
  );
}
