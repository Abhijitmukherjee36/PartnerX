export default function EmergencyContacts() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
      <h2 className="font-semibold">Emergency Contacts</h2>

      <div className="space-y-2">
        <Contact name="Mom" phone="+91 9XXXXXXXXX" />
        <Contact name="Best Friend" phone="+91 9XXXXXXXXX" />
      </div>

      <button className="border border-slate-700 px-4 py-2 rounded-lg hover:border-primary transition text-sm">
        Add Contact
      </button>
    </div>
  );
}

function Contact({ name, phone }) {
  return (
    <div className="flex items-center justify-between bg-slate-800 rounded-lg px-3 py-2">
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-slate-400">{phone}</p>
      </div>

      <button className="text-xs text-red-400 hover:underline">
        Remove
      </button>
    </div>
  );
}
