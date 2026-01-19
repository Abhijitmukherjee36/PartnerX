export default function Input({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-slate-400">{label}</label>
      <input
        type={type}
        className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />
    </div>
  );
}
