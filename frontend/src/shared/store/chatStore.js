import { create } from "zustand";

// Chat store (conversations + messages + selection)
// - State first, then actions
// - All actions update state via `set`
// - Use functional updates when depending on previous state
// - One store hook exported: useChatStore

const useChatStore = create((set) => ({
  // State
  conversations: [], // placeholder array for conversation items
  messages: [], // placeholder array for message items
  selectedConversation: null, // currently selected conversation id or object

  // Actions
  setConversations: (conversations) => set(() => ({ conversations })),

  addConversation: (conversation) =>
    set((state) => ({ conversations: [...state.conversations, conversation] })),

  updateConversation: (id, patch) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        String(c.id) === String(id) ? { ...c, ...patch } : c,
      ),
    })),

  removeConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter(
        (c) => String(c.id) !== String(id),
      ),
    })),

  clearConversations: () => set(() => ({ conversations: [] })),

  // Messages actions
  setMessages: (messages) => set(() => ({ messages })),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  updateMessage: (id, patch) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        String(m.id) === String(id) ? { ...m, ...patch } : m,
      ),
    })),

  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((m) => String(m.id) !== String(id)),
    })),

  clearMessagesForConversation: (conversationId) =>
    set((state) => ({
      messages: state.messages.filter(
        (m) => String(m.conversationId) !== String(conversationId),
      ),
    })),

  // Selection
  selectConversation: (conversation) =>
    set(() => ({ selectedConversation: conversation })),

  clearSelection: () => set(() => ({ selectedConversation: null })),

  // Participant helpers (operate on conversations immutably)
  addParticipant: (conversationId, userId) =>
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

  removeParticipant: (conversationId, userId) =>
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

  // Reset entire store to initial placeholders
  resetStore: () =>
    set(() => ({
      conversations: [],
      messages: [],
      selectedConversation: null,
    })),
}));

export default useChatStore;
