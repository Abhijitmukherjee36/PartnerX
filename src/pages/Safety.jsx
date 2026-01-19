import EmergencyContacts from "../components/safety/EmergencyContacts";
import SafetySession from "../components/safety/SafetySession";
import SOSButton from "../components/safety/SOSButton";

export default function Safety() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-6 sm:space-y-8">
      <h1 className="text-xl sm:text-2xl font-bold text-red-400">Safety Center</h1>

      <p className="text-sm sm:text-base text-slate-400">
        Your safety matters. Use the tools below when meeting or traveling
        with someone from the platform.
      </p>

      <SOSButton />
      <SafetySession />
      <EmergencyContacts />
    </div>
  );
}
