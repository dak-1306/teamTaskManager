import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../../../components/ui/alert-dialog";
import useChatStore from "../store/chatStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
  chatName?: string;
}

function DeleteConversation({ isOpen, onClose, chatId, chatName }: Props) {
  const { deleteConversation } = useChatStore();

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogTitle>Xóa cuộc trò chuyện {chatName || ""}</AlertDialogTitle>
        <AlertDialogDescription>
          Bạn có chắc chắn muốn xóa cuộc trò chuyện này không? Toàn bộ tin nhắn và dữ liệu liên quan sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
        </AlertDialogDescription>
        <div className="flex space-x-4 justify-center mt-4">
          <AlertDialogCancel onClick={onClose}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (chatId) {
                await deleteConversation(chatId);
              }
              onClose();
            }}
          >
            Xóa
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteConversation;
