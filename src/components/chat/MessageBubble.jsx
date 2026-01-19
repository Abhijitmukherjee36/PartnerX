export default function MessageBubble({ text, sender }) {
  const isMe = sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
          isMe ? "bg-primary text-white" : "bg-slate-800 text-slate-100"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
