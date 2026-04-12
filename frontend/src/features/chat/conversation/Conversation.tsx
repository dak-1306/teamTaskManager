import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Edit2, Trash2 } from "lucide-react";
import CreateConversationModal from "./CreateConversationModal";
import EditConversationModal from "./EditConversationModal";
import ManageParticipantsModal from "./ManageParticipantsModal";
import DeleteConversation from "./DeleteConversation";
import useChatStore from "../store/chatStore";
import useProjectStore from "../../project/stores/projectStore";
import { useParams } from "react-router-dom";

export function Conversation() {
  const { id } = useParams() as any;
  // Lấy các state và function cần thiết từ store
  const {
    conversations,
    selectedConversation,
    fetchConversations,
    createConversation,
    updateConversation,
    addParticipant,
    removeParticipant,
    selectConversation,
    loading,
  } = useChatStore();

  const projectDetail = useProjectStore((state: any) => state.projectDetail);

  // state UI cho các modals
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openManage, setOpenManage] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);

  // Derive activeConv from store conversations so updates are reactive
  const activeConv = useMemo(() => {
    return (
      conversations.find((c: any) => (c._id || c.id) === activeConvId) || null
    );
  }, [conversations, activeConvId]);

  // Lấy dữ liệu thực từ server khi component vừa được render
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Lấy danh sách thành viên trong dự án bao gồm (members + owner)
  const dataMemberOfProject = useMemo(() => {
    if (projectDetail?.members && projectDetail?.owner) {
      return [...projectDetail.members, projectDetail.owner].map(
        (member: any) => ({
          value: member._id,
          label: member.name || member.username, // Fallback username if name doesn't exist
          variant: member._id === projectDetail.owner._id ? "owner" : "member",
        }),
      );
    }
    return [];
  }, [projectDetail]);

  console.log("conversation in conversation", conversations);
  console.log("project detail in conversation", projectDetail);

  return (
    <div className="h-60">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-medium">Conversations</div>
        <div>
          <Button
            onClick={() => setOpenCreate(true)}
            variant="default"
            size="sm"
          >
            Create
          </Button>
        </div>
      </div>

      <div className="space-y-2 overflow-y-auto h-64">
        {loading && conversations.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-4">
            Đang tải cuộc trò chuyện...
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-4">
            Chưa có cuộc trò chuyện nào
          </div>
        ) : (
          conversations.map((c: any) => (
            <div
              key={c._id || c.id}
              className={`flex items-center justify-between gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 ${
                selectedConversation?._id === c._id
                  ? "bg-gray-100 dark:bg-gray-700"
                  : ""
              }`}
            >
              <Button
                onClick={() => selectConversation(c)}
                variant="ghost"
                className="flex-1 text-left"
                size="sm"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                  {c.name?.slice(0, 2).toUpperCase() || "??"}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium dark:text-white">
                    {c.name || "Unnamed"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {c.type === "channel" ? "Kênh" : c.type || "Chưa phân loại"}
                  </div>
                </div>
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    setActiveConvId(c._id || c.id);
                    setOpenManage(true);
                  }}
                  variant="default"
                  size="sm"
                  title="Thành viên"
                >
                  <UserPlus size={16} />
                </Button>
                <Button
                  onClick={() => {
                    setActiveConvId(c._id || c.id);
                    setOpenEdit(true);
                  }}
                  variant="secondary"
                  size="sm"
                  title="Sửa tên"
                >
                  <Edit2 size={16} />
                </Button>
                <Button
                  onClick={() => {
                    setActiveConvId(c._id || c.id);
                    setOpenDelete(true);
                  }}
                  variant="destructive"
                  size="sm"
                  title="Xóa"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateConversationModal
        isOpen={openCreate}
        memberOfProject={dataMemberOfProject}
        onClose={() => setOpenCreate(false)}
        onCreate={(conversation: any) => {
          // Gọi thao tác tạo, store sẽ thay đổi và tự render lại
          createConversation(conversation);
          setOpenCreate(false);
        }}
        projectId={id}
      />

      <EditConversationModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        conversation={activeConv}
        onUpdate={(updatedData: any) => {
          // Cập nhật cuộc trò chuyện bằng API
          if (activeConv?._id) {
            updateConversation(activeConv._id, updatedData);
          }
          setOpenEdit(false);
        }}
      />

      {activeConv && (
        <ManageParticipantsModal
          isOpen={openManage}
          onClose={() => setOpenManage(false)}
          conversation={activeConv}
          onAdd={(convId: string, userId: string) => {
            // Thực hiện add participant đẩy lên server
            addParticipant(convId, userId);
          }}
          onRemove={(convId: string, userId: string) => {
            // Thực hiện xóa participant đẩy lên server
            removeParticipant(convId, userId);
          }}
          memberOfProject={dataMemberOfProject}
        />
      )}

      <DeleteConversation
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        chatId={activeConv?._id || activeConv?.id}
        chatName={activeConv?.name || ""}
      />
    </div>
  );
}

export default Conversation;
