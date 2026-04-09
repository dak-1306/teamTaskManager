import { create } from "zustand";

// Basic types for chat
export type Conversation = {
  id: string;
  _id?: string;
  name?: string;
  type?: string;
  project?: string;
  task?: string;
  participants?: string[];
  subtitle?: string;
  [key: string]: any;
};

export type Message = {
  id: string;
  _id?: string;
  conversationId: string;
  sender?: string;
  senderName?: string;
  avatar?: string;
  type?: string;
  content?: string;
  createdAt?: string;
  [key: string]: any;
};

type ChatState = {
  conversations: Conversation[];
  messages: Message[];
  selectedConversation: Conversation | null;

  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, patch: Partial<Conversation>) => void;
  removeConversation: (id: string) => void;
  clearConversations: () => void;

  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, patch: Partial<Message>) => void;
  removeMessage: (id: string) => void;
  clearMessagesForConversation: (conversationId: string) => void;

  selectConversation: (conversation: Conversation | null) => void;
  clearSelection: () => void;

  addParticipant: (conversationId: string, userId: string) => void;
  removeParticipant: (conversationId: string, userId: string) => void;

  resetStore: () => void;
};

const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  messages: [],
  selectedConversation: null,

  setConversations: (conversations: Conversation[]) =>
    set(() => ({ conversations })),

  addConversation: (conversation: Conversation) =>
    set((state) => ({ conversations: [...state.conversations, conversation] })),

  updateConversation: (id: string, patch: Partial<Conversation>) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        String(c.id) === String(id) ? { ...c, ...patch } : c,
      ),
    })),

  removeConversation: (id: string) =>
    set((state) => ({
      conversations: state.conversations.filter(
        (c) => String(c.id) !== String(id),
      ),
    })),

  clearConversations: () => set(() => ({ conversations: [] })),

  setMessages: (messages: Message[]) => set(() => ({ messages })),

  addMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  updateMessage: (id: string, patch: Partial<Message>) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        String(m.id) === String(id) ? { ...m, ...patch } : m,
      ),
    })),

  removeMessage: (id: string) =>
    set((state) => ({
      messages: state.messages.filter((m) => String(m.id) !== String(id)),
    })),

  clearMessagesForConversation: (conversationId: string) =>
    set((state) => ({
      messages: state.messages.filter(
        (m) => String(m.conversationId) !== String(conversationId),
      ),
    })),

  selectConversation: (conversation: Conversation | null) =>
    set(() => ({ selectedConversation: conversation })),

  clearSelection: () => set(() => ({ selectedConversation: null })),

  addParticipant: (conversationId: string, userId: string) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        String(c.id) === String(conversationId)
          ? {
              ...c,
              participants: Array.from(
                new Set([...(c.participants || []), userId]),
              ),
            }
          : c,
      ),
    })),

  removeParticipant: (conversationId: string, userId: string) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        String(c.id) === String(conversationId)
          ? {
              ...c,
              participants: (c.participants || []).filter(
                (p) => String(p) !== String(userId),
              ),
            }
          : c,
      ),
    })),

  resetStore: () =>
    set(() => ({
      conversations: [],
      messages: [],
      selectedConversation: null,
    })),
}));

export default useChatStore;
