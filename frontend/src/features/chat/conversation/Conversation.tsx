import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Edit2, Trash2 } from "lucide-react";
import CreateConversationModal from "./CreateConversationModal";
import EditConversationModal from "./EditConversationModal";
import ManageParticipantsModal from "./ManageParticipantsModal";
import useChatStore from "../store/chatStore";

export function Conversation(): JSX.Element {
  const store = useChatStore() as any;
  const conversations = useChatStore((s: any) => s.conversations) as any[];
  const selectedConversation = useChatStore(
    (s: any) => s.selectedConversation,
  ) as any;
  const setConversations = useChatStore((s: any) => s.setConversations) as (
    c: any[],
  ) => void;
  const setMessages = useChatStore((s: any) => s.setMessages) as (
    m: any[],
  ) => void;
  const selectConversation = useChatStore((s: any) => s.selectConversation) as (
    c: any,
  ) => void;
  const addConversation = useChatStore((s: any) => s.addConversation) as (
    c: any,
  ) => void;
  const updateConversation = useChatStore((s: any) => s.updateConversation) as (
    id: string,
    c: any,
  ) => void;
  const addParticipant = useChatStore((s: any) => s.addParticipant) as (
    convId: string,
    userId: string,
  ) => void;
  const removeParticipant = useChatStore((s: any) => s.removeParticipant) as (
    convId: string,
    userId: string,
  ) => void;

  // local UI state for modals
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openManage, setOpenManage] = useState<boolean>(false);
  const [activeConv, setActiveConv] = useState<any>(null);

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
        {(conversations || []).map((c: any) => (
          <div
            key={c.id || c._id}
            className={`flex items-center justify-between gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedConversation?.id === (c.id || c._id) ? "bg-gray-100" : ""}`}
          >
            <Button
              onClick={() => selectConversation(c)}
              variant="ghost"
              className="flex-1 text-left"
              size="sm"
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
            </Button>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  setActiveConv(c);
                  setOpenManage(true);
                }}
                variant="default"
                size="sm"
              >
                <UserPlus size={16} />
              </Button>
              <Button
                onClick={() => {
                  setActiveConv(c);
                  setOpenEdit(true);
                }}
                variant="secondary"
                size="sm"
              >
                <Edit2 size={16} />
              </Button>
              <Button
                onClick={() => {
                  // remove from store for now
                  // optimistic UI: use store.removeConversation if available
                  if (store.removeConversation) store.removeConversation(c.id);
                }}
                variant="destructive"
                size="sm"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CreateConversationModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={(conversation: any) => {
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
        onUpdate={(updatedConversation: any) => {
          updateConversation(updatedConversation.id, updatedConversation);
          selectConversation(updatedConversation);
          setOpenEdit(false);
        }}
      />

      <ManageParticipantsModal
        isOpen={openManage}
        onClose={() => setOpenManage(false)}
        conversation={activeConv}
        onAdd={(convId: string, userId: string) => {
          addParticipant(convId, userId);
        }}
        onRemove={(convId: string, userId: string) => {
          removeParticipant(convId, userId);
        }}
      />
    </>
  );
}

export default Conversation;
