import { useEffect, useState } from "react";
import CreateConversationModal from "./CreateConversationModal";
import EditConversationModal from "./EditConversationModal";
import ManageParticipantsModal from "./ManageParticipantsModal";
import useChatStore from "../store/chatStore";

export function Conversation() {
  const store = useChatStore();
  const conversations = useChatStore((s) => s.conversations);
  const selectedConversation = useChatStore((s) => s.selectedConversation);
  const setConversations = useChatStore((s) => s.setConversations);
  const setMessages = useChatStore((s) => s.setMessages);
  const selectConversation = useChatStore((s) => s.selectConversation);
  const addConversation = useChatStore((s) => s.addConversation);
  const updateConversation = useChatStore((s) => s.updateConversation);
  const addParticipant = useChatStore((s) => s.addParticipant);
  const removeParticipant = useChatStore((s) => s.removeParticipant);

  // local UI state for modals
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openManage, setOpenManage] = useState(false);
  const [activeConv, setActiveConv] = useState(null);

  // Sample data that matches your models (conversations + messages)
  useEffect(() => {
    const sampleConversations = [
      {
        id: "c1",
        _id: "c1",
        name: "Project Alpha",
        type: "project",
        project: "p1",
        participants: ["u1", "u2", "u3"],
        subtitle: "Project-wide discussion",
      },
      {
        id: "c2",
        _id: "c2",
        name: "Task 123",
        type: "task",
        task: "t123",
        participants: ["u1", "u2"],
        subtitle: "Discussion for Task-123",
      },
    ];

    const sampleMessages = [
      {
        id: "m1",
        _id: "m1",
        conversationId: "c1",
        sender: "u2",
        senderName: "Alice",
        avatar: "https://i.pravatar.cc/40?img=1",
        type: "text",
        content: "Hello team!",
        createdAt: new Date().toISOString(),
      },
      {
        id: "m2",
        _id: "m2",
        conversationId: "c2",
        sender: "u3",
        senderName: "Bob",
        avatar: "https://i.pravatar.cc/40?img=5",
        type: "text",
        content: "Frontend changes pushed.",
        createdAt: new Date().toISOString(),
      },
    ];

    // Only set sample once if store is empty
    if (!conversations || conversations.length === 0) {
      setConversations(sampleConversations);
      setMessages(sampleMessages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-medium">Conversations</div>
        <div>
          <button
            onClick={() => setOpenCreate(true)}
            className="px-2 py-1 rounded bg-blue-500 text-white text-sm"
          >
            Create
          </button>
        </div>
      </div>

      <div className="space-y-2 overflow-y-auto h-64">
        {(conversations || []).map((c) => (
          <div
            key={c.id}
            className={`flex items-center justify-between gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedConversation?.id === c.id ? "bg-gray-100" : ""}`}
          >
            <button
              onClick={() => selectConversation(c)}
              className="flex items-center gap-3 flex-1 text-left"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                {c.name?.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium dark:text-white">
                  {c.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {c.subtitle}
                </div>
              </div>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveConv(c);
                  setOpenManage(true);
                }}
                className="text-sm px-2 py-1 rounded border"
              >
                Members
              </button>
              <button
                onClick={() => {
                  setActiveConv(c);
                  setOpenEdit(true);
                }}
                className="text-sm px-2 py-1 rounded border"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  // remove from store for now
                  // optimistic UI: use store.removeConversation if available
                  if (store.removeConversation) store.removeConversation(c.id);
                }}
                className="text-sm px-2 py-1 rounded bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateConversationModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={(conversation) => {
          // ensure id exists
          const conv = {
            id: conversation.id || `c_${Date.now()}`,
            ...conversation,
          };
          addConversation(conv);
          selectConversation(conv);
          setOpenCreate(false);
        }}
      />

      <EditConversationModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        conversation={activeConv}
        onUpdate={(updatedConversation) => {
          updateConversation(updatedConversation.id, updatedConversation);
          selectConversation(updatedConversation);
          setOpenEdit(false);
        }}
      />

      <ManageParticipantsModal
        isOpen={openManage}
        onClose={() => setOpenManage(false)}
        conversation={activeConv}
        onAdd={(convId, userId) => {
          addParticipant(convId, userId);
        }}
        onRemove={(convId, userId) => {
          removeParticipant(convId, userId);
        }}
      />
    </>
  );
}

export default Conversation;
