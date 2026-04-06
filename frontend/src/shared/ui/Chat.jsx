import { useEffect, useRef, useState } from "react";

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Alice",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "Hello team!",
      time: "10:00",
      mine: false,
    },
    {
      id: 2,
      user: "Me",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Hi, I'm working on the task.",
      time: "10:02",
      mine: true,
    },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef();

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: "Me",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: input,
      time: new Date().toLocaleTimeString().slice(0, 5),
      mine: true,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full  flex flex-col">
      {/* Header */}
      <div className="p-4 border-b font-semibold">Comments</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
          >
            {!msg.mine && (
              <img src={msg.avatar} className="w-8 h-8 rounded-full mr-2" />
            )}

            <div>
              {!msg.mine && (
                <div className="text-xs text-gray-500 mb-1">{msg.user}</div>
              )}

              <div
                className={`px-3 py-2 rounded-xl max-w-[200px] text-sm ${
                  msg.mine
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                {msg.text}
              </div>

              <div className="text-[10px] text-gray-400 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm dark:bg-gray-800"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
