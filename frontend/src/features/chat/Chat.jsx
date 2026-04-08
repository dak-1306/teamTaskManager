import { useEffect, useRef, useState } from "react";
import useChatStore from "../../store/chatStore";

export default function ChatPanel() {
  const selectedConv = useChatStore((s) => s.selectedConversation);
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);

  const [input, setInput] = useState("");
  const bottomRef = useRef();

  const currentMessages = (messages || []).filter(
    (m) => String(m.conversationId) === String(selectedConv?.id),
  );

  const sendMessage = () => {
    if (!input.trim() || !selectedConv) return;

    const newMessage = {
      id: `m_${Date.now()}`,
      _id: `m_${Date.now()}`,
      conversationId: selectedConv.id,
      sender: "me",
      senderName: "Me",
      avatar: "https://i.pravatar.cc/40?img=2",
      type: "text",
      content: input.trim(),
      createdAt: new Date().toISOString(),
    };

    addMessage(newMessage);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, selectedConv]);

  if (!selectedConv) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Compact Header with conversation button */}
      <div className="p-2 border-b flex items-center gap-3">
        <div className="flex-1">
          <div className="text-sm font-semibold truncate">
            {selectedConv?.name || "Conversation"}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {selectedConv?.subtitle}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <img
              src="https://i.pravatar.cc/28?img=3"
              className="w-6 h-6 rounded-full border"
            />
            <img
              src="https://i.pravatar.cc/28?img=4"
              className="w-6 h-6 rounded-full border"
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender !== "me" && (
              <img src={msg.avatar} className="w-8 h-8 rounded-full mr-2" />
            )}

            <div>
              {msg.sender !== "me" && (
                <div className="text-xs text-gray-500 mb-1">
                  {msg.senderName}
                </div>
              )}

              <div
                className={`px-3 py-2 rounded-xl max-w-[200px] text-sm ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700"}`}
              >
                {msg.content}
              </div>

              <div className="text-[10px] text-gray-400 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString().slice(0, 5)}
              </div>
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
          placeholder={
            selectedConv ? "Write a comment..." : "Select a conversation"
          }
          className="flex-1 border rounded-lg px-3 py-2 text-sm dark:bg-gray-800"
          disabled={!selectedConv}
        />
        <button
          onClick={sendMessage}
          className={`px-4 rounded-lg text-white ${selectedConv ? "bg-blue-500" : "bg-gray-400"}`}
          disabled={!selectedConv}
        >
          Send
        </button>
      </div>
    </div>
  );
}
