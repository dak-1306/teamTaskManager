import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type ManageParticipantsProps = {
  isOpen: boolean;
  onClose: () => void;
  conversation: { id: string; participants: string[] };
  onAdd: (conversationId: string, userId: string) => void;
  onRemove: (conversationId: string, userId: string) => void;
};
export default function ManageParticipantsDialog({
  isOpen,
  onClose,
  conversation,
  onAdd,
  onRemove,
}: ManageParticipantsProps) {
  const [userId, setUserId] = useState("");

  const add = () => {
    if (!userId) return;
    onAdd?.(conversation.id, userId);
    setUserId("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Participants</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="text-sm font-medium">Participants</div>

          <div className="space-y-1 max-h-40 overflow-y-auto">
            {conversation?.participants?.length ? (
              conversation.participants.map((p) => (
                <div
                  key={p}
                  className="flex items-center justify-between border rounded px-2 py-1"
                >
                  <span className="text-sm truncate">{p}</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onRemove?.(conversation.id, p)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-xs text-muted-foreground">
                No participants
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Add participant</Label>
            <div className="flex gap-2">
              <Input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="userId"
              />
              <Button onClick={add}>Add</Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
