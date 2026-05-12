import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Edit2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConversationListProps {
  loading: boolean;
  conversations: any[]; // Hoặc Conversation[] nếu bạn đã định nghĩa type
  // Thêm | undefined để khớp với giá trị truyền vào từ parent
  selectedId?: string | undefined;
  // Cập nhật hàm onSelect để nhận tham số có thể là null (giống như trong store)
  onSelect: (conv: any | null) => void;
  onAction: (type: "manage" | "edit" | "delete", id: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  loading,
  conversations,
  selectedId,
  onSelect,
  onAction,
}) => {
  if (loading && conversations.length === 0) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed rounded-lg">
        <p className="text-xs text-muted-foreground">No conversations yet</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 min-h-0 pr-3">
      <div className="space-y-1">
        {conversations.map((c) => {
          const id = c._id || c.id;
          const isSelected = selectedId === id;

          return (
            <div
              key={id}
              className={`group flex items-center justify-between p-2 rounded-md transition-all ${
                isSelected ? "bg-secondary" : "hover:bg-muted/50"
              }`}
            >
              <div
                className="flex items-center gap-3 flex-1 cursor-pointer"
                onClick={() => onSelect(c)}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">
                  {c.name?.slice(0, 2).toUpperCase() || "??"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {c.name || "Unnamed"}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1 h-4 font-normal"
                  >
                    {c.type === "channel" ? "Kênh" : "Cá nhân"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onAction("manage", id)}
                >
                  <UserPlus size={14} className="text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onAction("edit", id)}
                >
                  <Edit2 size={14} className="text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:text-destructive"
                  onClick={() => onAction("delete", id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
