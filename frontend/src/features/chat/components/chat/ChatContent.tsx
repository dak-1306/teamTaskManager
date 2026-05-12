import React from "react";
import { Loader2, MessageSquare, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Menu from "../Menu";

interface ChatContentProps {
  loading: boolean;
  messages: any[];
  currentUserId: string | undefined;
  isEditing: string | null;
  setIsEditing: (id: string | null) => void;
  editingContent: string;
  setEditingContent: (content: string) => void;
  handleEditMessage: (id: string, content: string) => void;
  handleDeleteMessage: (id: string) => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatContent: React.FC<ChatContentProps> = ({
  loading,
  messages,
  currentUserId,
  isEditing,
  setIsEditing,
  editingContent,
  setEditingContent,
  handleEditMessage,
  handleDeleteMessage,
  bottomRef,
}) => {
  // Trạng thái Loading với Skeleton để tránh giật lag layout
  if (loading && messages.length === 0) {
    return (
      <div className="flex-1 p-5 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex gap-3 ${i % 2 === 0 ? "flex-row-reverse" : ""}`}
          >
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton
                className={`h-12 w-[250px] rounded-2xl ${i % 2 === 0 ? "rounded-tr-none" : "rounded-tl-none"}`}
              />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Trạng thái Trống
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
        <div className="bg-muted/50 p-6 rounded-full mb-4">
          <MessageSquare className="w-12 h-12 text-muted-foreground/40" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          No messages yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Be the first to start the conversation!
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 min-h-0 w-full">
      <div className="px-4 space-y-8 py-4">
      {messages.map((msg: any) => {
        const senderObj = typeof msg.sender === "object" ? msg.sender : null;
        const senderId = senderObj?._id || msg.sender;
        const isMe = String(senderId) === String(currentUserId);
        const senderName = senderObj?.username || msg.senderName || "User";
        const senderAvatar = senderObj?.avatar || msg.avatar;

        return (
          <div
            key={msg._id || msg.id}
            className={`group flex items-start gap-3 transition-all ${isMe ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar sử dụng Shadcn Avatar */}
            <Avatar className="w-8 h-8 border shadow-sm shrink-0 mt-1">
              <AvatarImage src={senderAvatar} alt={senderName} />
              <AvatarFallback className="bg-primary/10 text-[10px] font-bold">
                {senderName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div
              className={`flex flex-col max-w-[75%] ${isMe ? "items-end" : "items-start"}`}
            >
              {/* Tên người gửi (chỉ hiện nếu không phải mình) */}
              {!isMe && (
                <span className="text-[11px] font-medium text-muted-foreground ml-1 mb-1">
                  {senderName}
                </span>
              )}

              <div
                className={`relative flex items-center gap-2 ${isMe ? "flex-row-reverse" : ""}`}
              >
                {/* Bong bóng tin nhắn */}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-colors
                      ${
                        isMe
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted text-foreground rounded-tl-none border border-border/50"
                      }`}
                >
                  {isEditing === (msg._id || msg.id) ? (
                    <div className="flex flex-col gap-3 min-w-[200px] py-1">
                      <Input
                        autoFocus
                        className="bg-background text-foreground h-9 focus-visible:ring-1"
                        defaultValue={msg.content}
                        onChange={(e) => setEditingContent(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            handleEditMessage(
                              msg._id || msg.id,
                              editingContent,
                            );
                          if (e.key === "Escape") setIsEditing(null);
                        }}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs"
                          onClick={() => setIsEditing(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => {
                            handleEditMessage(
                              msg._id || msg.id,
                              editingContent,
                            );
                            setIsEditing(null);
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  )}

                  {/* Hiển thị Attachments */}
                  {msg.attachments?.length > 0 && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-black/5 dark:border-white/10">
                      <img
                        src={msg.attachments[0].url}
                        className="max-h-60 w-full object-cover hover:scale-105 transition-transform cursor-zoom-in"
                        alt="attachment"
                      />
                    </div>
                  )}
                </div>

                {/* Nút Menu (Ẩn hiện khi hover) */}
                <div
                  className={`opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? "mr-1" : "ml-1"}`}
                >
                  <Menu
                    messageId={msg._id || msg.id}
                    handleDelete={() => handleDeleteMessage(msg._id || msg.id)}
                    handleEdit={() => setIsEditing(msg._id || msg.id)}
                  />
                </div>
              </div>

              {/* Thời gian tin nhắn */}
              <span className="text-[10px] text-muted-foreground mt-1.5 px-1 opacity-70">
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
      })}
        <div ref={bottomRef} className="h-4" />
      </div>
    </ScrollArea>
  );
};
