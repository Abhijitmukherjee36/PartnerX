const MOCK_CHATS = [
  { id: 1, name: "Aarav", lastMessage: "Let’s plan Goa trip" },
  { id: 2, name: "Riya", lastMessage: "Tonight?" },
  { id: 3, name: "Kabir", lastMessage: "Flat details shared" },
];

export default function ChatList() {
  return (
    <div className="w-72 border-r border-slate-800 bg-slate-900">
      <h2 className="p-4 font-semibold">Chats</h2>

      <div>
        {MOCK_CHATS.map((chat) => (
          <div
            key={chat.id}
            className="px-4 py-3 hover:bg-slate-800 cursor-pointer"
          >
            <p className="font-medium">{chat.name}</p>
            <p className="text-sm text-slate-400 truncate">
              {chat.lastMessage}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
