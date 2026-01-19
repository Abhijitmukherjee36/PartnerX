export default function IntentSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {value.map((intent) => (
        <button
          key={intent.id}
          type="button"
          onClick={() => onChange(intent.id)}
          className={`border rounded-xl p-3 text-sm transition ${
            intent.selected
              ? "border-primary bg-primary/10 text-primary"
              : "border-slate-700 hover:border-slate-500"
          }`}
        >
          {intent.label}
        </button>
      ))}
    </div>
  );
}
