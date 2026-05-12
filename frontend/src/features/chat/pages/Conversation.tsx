import React, { useEffect, useState, useMemo } from "react";
import useChatStore from "../store/chatStore";
import useProjectStore from "@/features/project/stores/projectStore";

import { ConversationHeader } from "../components/conversation/ConversationHeader";
import { ConversationList } from "../components/conversation/ConversationList";

// Modals
import CreateConversationModal from "../components/conversation/CreateConversationModal";
import EditConversationModal from "../components/conversation/EditConversationModal";
import ManageParticipantsModal from "../components/conversation/ManageParticipantsModal";
import DeleteConversation from "../components/conversation/DeleteConversation";

export function Conversation({ projectId, taskId, variant }: any) {
  const {
    conversations,
    selectedConversation,
    clearSelection,
    fetchConversations,
    createConversation,
    updateConversation,
    addParticipant,
    removeParticipant,
    selectConversation,
    loading,
  } = useChatStore();

  const projectDetail = useProjectStore((state: any) => state.projectDetail);

  // State Modals
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    manage: false,
    delete: false,
  });
  const [activeConvId, setActiveConvId] = useState<string | null>(null);

  const activeConv = useMemo(
    () =>
      conversations.find((c: any) => (c._id || c.id) === activeConvId) || null,
    [conversations, activeConvId],
  );

  const filter = useMemo(
    () => (projectId ? { project: projectId } : taskId ? { task: taskId } : {}),
    [projectId, taskId],
  );

  useEffect(() => {
    fetchConversations(filter);
    return () => {
      clearSelection();
    };
  }, [fetchConversations, filter]);

  const dataMemberOfProject = useMemo(() => {
    if (!projectDetail?.members) return [];
    return [...projectDetail.members, projectDetail.owner].map((m: any) => ({
      value: m._id,
      label: m.name || m.username,
      variant: m._id === projectDetail.owner?._id ? "owner" : "member",
    }));
  }, [projectDetail]);

  const handleAction = (type: keyof typeof modals, id: string) => {
    setActiveConvId(id);
    setModals((prev) => ({ ...prev, [type]: true }));
  };

  return (
    <div className="flex flex-col h-full p-4 bg-background rounded-lg">
      <ConversationHeader
        variant={variant}
        onOpenCreate={() => setModals((p) => ({ ...p, create: true }))} // Hoặc setModals
      />

      <ConversationList
        loading={loading}
        conversations={conversations}
        selectedId={selectedConversation?._id}
        onSelect={selectConversation}
        onAction={(type, id) => handleAction(type, id)}
      />

      {/* MODAL MANAGER */}
      <CreateConversationModal
        isOpen={modals.create}
        memberOfProject={dataMemberOfProject}
        onClose={() => setModals((p) => ({ ...p, create: false }))}
        onCreate={(data: any) => {
          createConversation(data);
          setModals((p) => ({ ...p, create: false }));
        }}
        projectId={projectId}
        taskId={taskId}
      />

      <EditConversationModal
        isOpen={modals.edit}
        onClose={() => setModals((p) => ({ ...p, edit: false }))}
        conversation={activeConv}
        onUpdate={(data: any) => {
          if (activeConv?._id) updateConversation(activeConv._id, data);
          setModals((p) => ({ ...p, edit: false }));
        }}
      />

      {activeConv && (
        <ManageParticipantsModal
          isOpen={modals.manage}
          onClose={() => setModals((p) => ({ ...p, manage: false }))}
          conversation={activeConv}
          onAdd={addParticipant}
          onRemove={removeParticipant}
          memberOfProject={dataMemberOfProject}
        />
      )}

      <DeleteConversation
        isOpen={modals.delete}
        onClose={() => setModals((p) => ({ ...p, delete: false }))}
        chatId={activeConv?._id || activeConv?.id}
        chatName={activeConv?.name || ""}
      />
    </div>
  );
}

export default Conversation;
