import { create } from "zustand";
import axiosClient from "../../../lib/axios";

// Basic types for chat
export type Conversation = {
  _id?: string;
  name?: string;
  type?: string;
  project?: string;
  task?: string;
  participants?: string[];
  metadata?: Record<string, any>;
  isArchived?: boolean;
  [key: string]: any;
};

export type Message = {
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

type ChatStore = {
  conversations: Conversation[];
  messages: Message[];
  selectedConversation: Conversation | null;
  loading: boolean;
  error: string | null;

  // Conversations
  fetchConversations: (filters?: {
    project?: string;
    participant?: string;
  }) => Promise<void>;
  fetchConversationById: (id: string) => Promise<void>;
  createConversation: (data: Partial<Conversation>) => Promise<void>;
  updateConversation: (
    id: string,
    data: Partial<Conversation>,
  ) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  addParticipant: (conversationId: string, userId: string) => Promise<void>;
  removeParticipant: (conversationId: string, userId: string) => Promise<void>;

  // Messages
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (
    conversationId: string,
    payload: { content?: string; type?: string; attachments?: any[] },
  ) => Promise<void>;

  selectConversation: (conversation: Conversation | null) => void;
  clearSelection: () => void;
  resetStore: () => void;
};

const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  messages: [],
  selectedConversation: null,
  loading: false,
  error: null,

  fetchConversations: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      // Gọi API lấy danh sách cuộc trò chuyện, truyền params lọc (nếu có: project, participant)
      const response = await axiosClient.get<Conversation[]>("/conversations", {
        params: filters,
      });
      set({ conversations: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  fetchConversationById: async (id) => {
    set({ loading: true, error: null });
    try {
      // Gọi API lấy thông tin chi tiết một cuộc trò chuyện
      const response = await axiosClient.get<Conversation>(
        `/conversations/${id}`,
      );
      set({ selectedConversation: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  createConversation: async (data) => {
    set({ loading: true, error: null });
    try {
      // Gọi API tạo cuộc trò chuyện mới, payload: name, type, participants, project...
      const response = await axiosClient.post<Conversation>(
        "/conversations",
        data,
      );
      set((state) => ({
        conversations: [response.data, ...state.conversations],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  updateConversation: async (id, data) => {
    set({ loading: true, error: null });
    try {
      // Cập nhật thông tin cuộc trò chuyện (đổi tên, trạng thái isArchived...)
      const response = await axiosClient.put<Conversation>(
        `/conversations/${id}`,
        data,
      );
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c._id === id ? response.data : c,
        ),
        selectedConversation:
          state.selectedConversation?._id === id
            ? response.data
            : state.selectedConversation,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  deleteConversation: async (id) => {
    set({ loading: true, error: null });
    try {
      // Gọi API xóa cuộc trò chuyện
      await axiosClient.delete(`/conversations/${id}`);
      set((state) => ({
        conversations: state.conversations.filter(
          (c) => String(c._id) !== String(id) && String(c.id) !== String(id),
        ),
        selectedConversation:
          String(state.selectedConversation?._id) === String(id) ||
          String(state.selectedConversation?.id) === String(id)
            ? null
            : state.selectedConversation,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  addParticipant: async (conversationId, userId) => {
    set({ loading: true, error: null });
    try {
      // Gọi API đẩy thêm userId vào mảng participants của conversation
      const response = await axiosClient.post<Conversation>(
        `/conversations/${conversationId}/participants`,
        { userId },
      );
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c._id === conversationId ? response.data : c,
        ),
        selectedConversation:
          state.selectedConversation?._id === conversationId
            ? response.data
            : state.selectedConversation,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  removeParticipant: async (conversationId, userId) => {
    set({ loading: true, error: null });
    console.log("conversationId", conversationId);
    console.log("userId", userId);
    try {
      // Xóa thành viên khỏi cuộc trò chuyện
      const response = await axiosClient.delete<Conversation>(
        `/conversations/${conversationId}/participants/${userId}`,
      );
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c._id === conversationId ? response.data : c,
        ),
        selectedConversation:
          state.selectedConversation?._id === conversationId
            ? response.data
            : state.selectedConversation,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  fetchMessages: async (conversationId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get<Message[]>(
        `/chats/conversation/${conversationId}`,
      );
      set({ messages: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  sendMessage: async (conversationId, payload) => {
    console.log("payload in chat store", payload);
    console.log("conversationId in chat store", conversationId);
    try {
      const response = await axiosClient.post<Message>(
        `/chats/conversation/${conversationId}`,
        payload,
      );
      set((state) => ({ messages: [...state.messages, response.data] }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err) });
    }
  },

  selectConversation: (conversation) =>
    set(() => ({ selectedConversation: conversation })),

  clearSelection: () => set(() => ({ selectedConversation: null })),

  resetStore: () =>
    set(() => ({
      conversations: [],
      messages: [],
      selectedConversation: null,
      error: null,
      loading: false,
    })),
}));

export default useChatStore;
