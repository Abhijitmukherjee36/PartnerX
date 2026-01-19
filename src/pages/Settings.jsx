export default function Settings() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-6 sm:space-y-8">
      <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>

      {/* Privacy */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Privacy</h2>

        <SettingItem
          title="Show my profile in Discover"
          description="Allow others to find you in discovery results"
        />

        <SettingItem
          title="Allow messages from new connections"
          description="People can message you after connecting"
        />
      </section>

      {/* Notifications */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Notifications</h2>

        <SettingItem
          title="New message alerts"
          description="Get notified when someone sends you a message"
        />

        <SettingItem
          title="Community activity"
          description="Likes, comments, and mentions"
        />
      </section>

      {/* Safety */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Safety</h2>

        <SettingItem
          title="Share live location during meetups"
          description="Automatically enable safety tracking"
        />

        <SettingItem
          title="Emergency contacts enabled"
          description="Quick access to SOS features"
        />
      </section>

      {/* Account */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Account</h2>

        <button className="text-red-400 hover:underline text-sm">
          Deactivate account
        </button>
      </section>
    </div>
  );
}

function SettingItem({ title, description }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm sm:text-base">{title}</p>
        <p className="text-xs sm:text-sm text-slate-400">{description}</p>
      </div>

      <label className="inline-flex items-center cursor-pointer shrink-0">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:bg-primary transition relative">
          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-5" />
        </div>
      </label>
    </div>
  );
}

