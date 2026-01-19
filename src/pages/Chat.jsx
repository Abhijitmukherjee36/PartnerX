import { useState } from "react";
import ChatList from "../components/chat/ChatList";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);

  const MOCK_CHATS = [
    {
      id: 1,
      name: "Aarav",
      avatar: "A",
      status: "online",
      lastMessage: "Let's plan Goa trip",
      timestamp: "2m",
      unread: 2,
    },
    {
      id: 2,
      name: "Riya",
      avatar: "R",
      status: "online",
      lastMessage: "Tonight?",
      timestamp: "5m",
      unread: 0,
    },
    {
      id: 3,
      name: "Kabir",
      avatar: "K",
      status: "offline",
      lastMessage: "Flat details shared",
      timestamp: "1h",
      unread: 0,
    },
    {
      id: 4,
      name: "Priya",
      avatar: "P",
      status: "online",
      lastMessage: "Gym tomorrow?",
      timestamp: "30m",
      unread: 1,
    },
    {
      id: 5,
      name: "Arjun",
      avatar: "Ar",
      status: "offline",
      lastMessage: "Trail looks amazing",
      timestamp: "2h",
      unread: 0,
    },
  ];

  const MOCK_MESSAGES = {
    1: [
      {
        id: 1,
        sender: "Aarav",
        text: "Hey! How are you?",
        time: "10:30 AM",
        isSent: false,
      },
      {
        id: 2,
        sender: "Me",
        text: "I'm good! How about you?",
        time: "10:32 AM",
        isSent: true,
      },
      {
        id: 3,
        sender: "Aarav",
        text: "Let's plan Goa trip",
        time: "10:35 AM",
        isSent: false,
      },
      {
        id: 4,
        sender: "Me",
        text: "Sure! When?",
        time: "10:36 AM",
        isSent: true,
      },
    ],
    2: [
      { id: 1, sender: "Riya", text: "Hey!", time: "2:15 PM", isSent: false },
      { id: 2, sender: "Me", text: "Hi Riya!", time: "2:16 PM", isSent: true },
      {
        id: 3,
        sender: "Riya",
        text: "Tonight?",
        time: "2:20 PM",
        isSent: false,
      },
    ],
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setMessages(MOCK_MESSAGES[chat.id] || []);
    setShowChatList(false); // Hide chat list on mobile when selecting a chat
  };

  const handleBackToList = () => {
    setShowChatList(true);
    setSelectedChat(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "Me",
          text: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isSent: true,
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex bg-slate-950 overflow-hidden">
      {/* Left: Chat List */}
      <div className={`${showChatList ? 'flex' : 'hidden'} md:flex w-full md:w-80 lg:w-96 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 flex-col`}>
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800">
          <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Messages
          </h1>
          <div className="flex gap-2">
            <input
              placeholder="Search conversations..."
              className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-full px-3 sm:px-4 py-2 text-sm placeholder-slate-500 text-slate-200 focus:outline-none focus:border-primary/50 transition"
            />
            <button className="bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 hover:border-primary/50 rounded-full p-2 transition duration-300">
              ⚙️
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {MOCK_CHATS.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`px-3 py-2.5 sm:py-2 mx-2 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedChat?.id === chat.id
                  ? "bg-gradient-to-r from-primary/30 to-purple-600/30 border border-primary/50"
                  : "hover:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white text-sm sm:text-base">
                    {chat.avatar}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-slate-900 ${
                      chat.status === "online" ? "bg-green-500" : "bg-slate-600"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-100 text-sm sm:text-base">{chat.name}</p>
                    <span className="text-xs text-slate-400">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="bg-primary text-white text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Chat Window */}
      {selectedChat ? (
        <div className={`${!showChatList ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-slate-950`}>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-850 border-b border-slate-800 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Back button for mobile */}
              <button
                onClick={handleBackToList}
                className="md:hidden bg-slate-800/50 hover:bg-slate-700 border border-slate-700 rounded-full p-2 mr-1 transition duration-300"
              >
                ←
              </button>
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white text-sm sm:text-base">
                  {selectedChat.avatar}
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-slate-900 ${
                    selectedChat.status === "online"
                      ? "bg-green-500"
                      : "bg-slate-600"
                  }`}
                />
              </div>
              <div>
                <h2 className="font-bold text-slate-100 text-sm sm:text-base">
                  {selectedChat.name}
                </h2>
                <p className="text-xs text-slate-400">
                  {selectedChat.status === "online" ? "Active now" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <button className="bg-slate-800/50 hover:bg-slate-700 border border-slate-700 rounded-full p-2 sm:p-2.5 transition duration-300 text-primary text-sm sm:text-base">
                ☎️
              </button>
              <button className="hidden sm:block bg-slate-800/50 hover:bg-slate-700 border border-slate-700 rounded-full p-2.5 transition duration-300 text-primary">
                📹
              </button>
              <button className="bg-slate-800/50 hover:bg-slate-700 border border-slate-700 rounded-full p-2 sm:p-2.5 transition duration-300 text-primary text-sm sm:text-base">
                ℹ️
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto scrollbar-hide px-3 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl ${
                    msg.isSent
                      ? "bg-gradient-to-r from-primary to-purple-600 text-white rounded-br-none"
                      : "bg-slate-800/80 text-slate-100 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${msg.isSent ? "text-primary-100" : "text-slate-500"}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-gradient-to-t from-slate-900 to-slate-950 border-t border-slate-800 px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex gap-2 sm:gap-3 items-end">
              <button className="hidden sm:block bg-slate-800/50 hover:bg-slate-700 border border-slate-700 rounded-full p-2.5 transition duration-300 text-primary">
                ➕
              </button>
              <div className="flex-1 relative">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-2.5 sm:py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary/50 transition text-sm sm:text-base"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition">
                  😊
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-700 text-white rounded-full p-2.5 transition duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50"
              >
                📤
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${!showChatList ? 'flex' : 'hidden'} md:flex flex-1 flex-col items-center justify-center text-slate-400 px-4`}>
          <div className="text-5xl sm:text-6xl mb-4">💬</div>
          <p className="text-lg sm:text-xl font-semibold text-center">
            Select a conversation to start messaging
          </p>
          <p className="text-xs sm:text-sm mt-2 text-center">Choose a chat from the left to begin</p>
        </div>
      )}
    </div>
  );
}

