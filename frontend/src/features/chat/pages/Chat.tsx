import React, { useEffect, useRef, useState } from "react";
import useChatStore from "../store/chatStore";
import { useAuth } from "@/features/auth/context/AuthContext";
import { MessageSquare } from "lucide-react";

import { ChatHeader } from "../components/chat/ChatHeader";
import { ChatContent } from "../components/chat/ChatContent";
import { ChatFooter } from "../components/chat/ChatFooter";

export default function ChatPanel() {
  // ... (Giữ nguyên các store và state từ file gốc của bạn) ...
  const selectedConv = useChatStore((s: any) => s.selectedConversation) as any;
  const messages = useChatStore((s: any) => s.messages) as any[];
  const fetchMessages = useChatStore((s: any) => s.fetchMessages) as any;
  const sendMessageStore = useChatStore((s: any) => s.sendMessage) as any;
  const deleteMessageStore = useChatStore((s: any) => s.deleteMessage) as any;
  const editMessageStore = useChatStore((s: any) => s.editMessage) as any;
  const loading = useChatStore((s: any) => s.loading) as boolean;
  const { userProfile } = useAuth();

  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [inputFile, setInputFile] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const activeId = selectedConv?._id || selectedConv?.id;
  const currentUserId = userProfile?._id || userProfile?.id;

  useEffect(() => {
    if (activeId) fetchMessages(activeId);
  }, [activeId, fetchMessages]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !activeId) return;
    const formData = new FormData();
    formData.append("content", input.trim());
    formData.append("type", "text");
    inputFile.forEach((file) => formData.append("attachments", file));

    try {
      setIsSending(true);
      await sendMessageStore(activeId, formData);
      setInput("");
      setInputFile([]);
    } finally {
      setIsSending(false);
    }
  };

  if (!selectedConv) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-white dark:bg-gray-900 ">
        <MessageSquare className="w-12 h-12 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Your Messages
        </h3>
        <p className="text-sm mt-1">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-background dark:bg-gray-900 relative shadow-inner overflow-hidden">
      <ChatHeader selectedConv={selectedConv} />

      <ChatContent
        loading={loading}
        messages={messages}
        currentUserId={currentUserId}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingContent={editingContent}
        setEditingContent={setEditingContent}
        handleEditMessage={editMessageStore}
        handleDeleteMessage={deleteMessageStore}
        bottomRef={bottomRef}
      />

      <ChatFooter
        input={input}
        setInput={setInput}
        inputFile={inputFile}
        setInputFile={setInputFile}
        isSending={isSending}
        handleSend={handleSend}
        disabled={!selectedConv || loading}
      />
    </div>
  );
}
