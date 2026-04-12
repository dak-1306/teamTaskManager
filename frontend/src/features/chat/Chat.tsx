import React, { useEffect, useRef, useState } from "react";
import useChatStore from "./store/chatStore";
import { useAuth } from "../auth/context/AuthContext";
import { Send, Loader2, MessageSquare, Info } from "lucide-react";

export default function ChatPanel() {
  const selectedConv = useChatStore((s: any) => s.selectedConversation) as any;
  const messages = useChatStore((s: any) => s.messages) as any[];
  const fetchMessages = useChatStore((s: any) => s.fetchMessages) as (
    id: string,
  ) => Promise<void>;
  const sendMessageStore = useChatStore((s: any) => s.sendMessage) as (
    convId: string,
    p: any,
  ) => Promise<void>;
  const loading = useChatStore((s: any) => s.loading) as boolean;

  const { userProfile } = useAuth();

  const [input, setInput] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const activeId = selectedConv?._id || selectedConv?.id;

  useEffect(() => {
    if (activeId) {
      fetchMessages(activeId);
    }
  }, [activeId, fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeId]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !activeId) return;

    try {
      setIsSending(true);
      await sendMessageStore(activeId, { content: input.trim(), type: "text" });
      setInput("");
    } finally {
      setIsSending(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentUserId = userProfile?._id || userProfile?.id;

  if (!selectedConv) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-white dark:bg-gray-900 ">
        <MessageSquare className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-700" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Your Messages
        </h3>
        <p className="text-sm mt-1">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900  relative shadow-inner">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-lg shadow-md shrink-0">
            {selectedConv?.name?.charAt(0)?.toUpperCase() || "C"}
          </div>
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-md font-semibold text-gray-900 dark:text-gray-100 truncate">
              {selectedConv?.name || "Conversation"}
            </h2>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
              {selectedConv?.participants?.length || 0} participants
            </span>
          </div>
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {loading && messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MessageSquare className="w-10 h-10 mb-2 opacity-20" />
            <p className="text-sm">No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg: any) => {
            const senderObj =
              typeof msg.sender === "object" && msg.sender !== null
                ? msg.sender
                : null;
            const senderId = senderObj?._id || msg.sender;
            const isMe = String(senderId) === String(currentUserId);

            const senderName =
              senderObj?.username || msg.senderName || "Unknown User";
            const senderAvatar =
              senderObj?.avatar ||
              msg.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(senderName)}&background=random`;

            return (
              <div
                key={msg._id || msg.id}
                className={`flex gap-3 max-w-[80%] ${isMe ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {!isMe && (
                  <img
                    src={senderAvatar}
                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm mt-auto shrink-0"
                    alt={senderName}
                  />
                )}

                <div
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  {!isMe && (
                    <span className="text-[11px] text-gray-500 mb-1 ml-1 font-medium">
                      {senderName}
                    </span>
                  )}

                  <div
                    className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm whitespace-pre-wrap word-break break-words
                    ${
                      isMe
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200/50 dark:border-gray-700/50"
                    }`}
                  >
                    {msg.content}
                  </div>

                  <span className="text-[10px] text-gray-400 mt-1 opacity-80">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} className="h-1 text-transparent" />
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-2 border border-gray-200 dark:border-gray-700 rounded-full focus-within:ring-2 ring-blue-500/50 focus-within:border-blue-500/50 transition-all shadow-sm"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:outline-none px-4 py-1 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 w-full"
            disabled={!selectedConv || loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || !selectedConv || isSending}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all shrink-0
              ${
                input.trim() && !isSending
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-300 dark:border-gray-600"
              }
            `}
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4 ml-[-2px]" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
