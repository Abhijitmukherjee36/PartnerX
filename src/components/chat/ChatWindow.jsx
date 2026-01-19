import MessageBubble from "./MessageBubble";

const MOCK_MESSAGES = [
  { id: 1, text: "Hey!", sender: "other" },
  { id: 2, text: "Hi, how are you?", sender: "me" },
  { id: 3, text: "Planning this weekend?", sender: "other" },
];

export default function ChatWindow() {
  return (
    <div className="flex-1 flex flex-col bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 p-4 font-medium">Aarav</div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {MOCK_MESSAGES.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-4">
        <input
          placeholder="Type a message..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
