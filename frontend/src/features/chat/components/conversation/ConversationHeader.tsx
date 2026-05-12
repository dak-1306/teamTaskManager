import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"; // Giả định icon

interface ConversationHeaderProps {
  variant?: "owner" | "member";
  onOpenCreate: () => void;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  variant,
  onOpenCreate,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-semibold tracking-tight">Conversations</h3>
      <Button
        onClick={onOpenCreate}
        variant={variant === "owner" ? "default" : "outline"}
        size="sm"
        className="h-8 gap-1.5"
      >
        {variant === "owner" ? (
          <>
            <Plus size={14} /> Create
          </>
        ) : (
          "Join"
        )}
      </Button>
    </div>
  );
};
