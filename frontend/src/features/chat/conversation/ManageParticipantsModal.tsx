import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Filter from "../../../components/common/Filter";
import { Label } from "@/components/ui/label";

type ManageParticipantsProps = {
  isOpen: boolean;
  onClose: () => void;
  conversation: any;
  // Function callback khi thêm user, sẽ gọi API
  onAdd: (conversationId: string, userId: string) => void;
  // Function callback khi xóa user, sẽ gọi API
  onRemove: (conversationId: string, userId: string) => void;
  memberOfProject: { value: string; label: string }[];
};

export default function ManageParticipantsDialog({
  isOpen,
  onClose,
  conversation,
  onAdd,
  onRemove,
  memberOfProject,
}: ManageParticipantsProps) {
  const [userId, setUserId] = useState("");

  const add = () => {
    if (!userId) return;
    // Gọi hàm onAdd kèm theo _id của cuộc trò chuyện
    onAdd?.(conversation._id || conversation.id || "", userId);
    setUserId("");
  };

  const usersInConversation = conversation.participants || [];

  // Lọc ra các thành viên CÓ trong dự án nhưng CHƯA tham gia vào cuộc trò chuyện này
  const filterParticipants =
    memberOfProject?.filter(
      (member) => !usersInConversation.includes(member.value),
    ) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quản lý thành viên</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="text-sm font-medium">Thành viên hiện tại</div>

          <div className="space-y-1 max-h-40 overflow-y-auto">
            {usersInConversation.length ? (
              usersInConversation.map((p) => {
                // Map ID thành tên cho dễ nhìn
                const matchedMember = memberOfProject?.find(
                  (m) => m.value === p,
                );
                return (
                  <div
                    key={p}
                    className="flex items-center justify-between border rounded px-2 py-1"
                  >
                    <span className="text-sm truncate">
                      {matchedMember ? matchedMember.label : p}
                    </span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        onRemove?.(
                          conversation._id || conversation.id || "",
                          p,
                        );
                      }}
                    >
                      Xóa
                    </Button>
                  </div>
                );
              })
            ) : (
              <div className="text-xs text-muted-foreground">
                Chưa có thành viên nào
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Thêm thành viên mới</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                {filterParticipants.length > 0 ? (
                  <Filter
                    name="participants"
                    options={filterParticipants}
                    value={userId}
                    onFilterChange={(val: string) => setUserId(val)}
                  />
                ) : (
                  <div className="text-sm text-gray-500 py-2">
                    Tất cả thành viên dự án đã ở trong phòng
                  </div>
                )}
              </div>
              <Button
                onClick={add}
                disabled={!userId || filterParticipants.length === 0}
              >
                Thêm
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
