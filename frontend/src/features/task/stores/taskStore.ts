import axiosClient from "../../../lib/axios";
import { create } from "zustand";

type UserSummary = { _id?: string; email?: string; username?: string };

type Task = {
  _id?: string;
  title?: string;
  description?: string;
  dueDate?: string;
  status?: string;
  priority?: string;
  assignedTo?: UserSummary[];
  project?: { _id?: string } | null;
};

type PaginatedTasks = {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
};

type TaskOverview = {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
};

type TaskStore = {
  tasks: PaginatedTasks;
  taskSearchResults: PaginatedTasks;
  taskOverview: TaskOverview;
  taskDetail: Task | null;
  loading: boolean;
  error: string | null;

  fetchTaskOverview: () => Promise<void>;
  fetchTasks: (page?: number, limit?: number) => Promise<void>;
  fetchTasksByProjectId: (
    projectId: string,
    page?: number,
    limit?: number,
  ) => Promise<void>;
  fetchTaskById: (taskId: string) => Promise<void>;
  createTask: (taskData: Partial<Task>) => Promise<void>;
  updateTask: (taskId: string, updatedData: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  addAssignees: (taskId: string, assigneeEmail: string) => Promise<void>;
  searchTasks: (
    query: string,
    projectId?: string,
    page?: number,
    limit?: number,
  ) => Promise<void>;
  filterTasks: (
    filters: Record<string, any>,
    page?: number,
    limit?: number,
  ) => Promise<void>;
};

const initialPaginated: PaginatedTasks = {
  tasks: [],
  total: 0,
  page: 1,
  limit: 10,
};
const initialOverview: TaskOverview = {
  totalTasks: 0,
  completedTasks: 0,
  inProgressTasks: 0,
};

const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialPaginated,
  taskSearchResults: initialPaginated,
  taskOverview: initialOverview,
  taskDetail: null,
  loading: false,
  error: null,

  fetchTaskOverview: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get<TaskOverview>("/tasks/overview");
      set({ taskOverview: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  fetchTasks: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get<PaginatedTasks>("/tasks/me", {
        params: { page, limit },
      });
      set({ tasks: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  fetchTasksByProjectId: async (projectId, page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get<PaginatedTasks>(
        `/tasks/projects/${projectId}`,
        {
          params: { page, limit },
        },
      );
      // eslint-disable-next-line no-console
      console.log("Fetched tasks for project", projectId, response.data);
      set({ tasks: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  fetchTaskById: async (taskId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get<Task>(`/tasks/${taskId}`);
      set({ taskDetail: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  createTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.post<Task>("/tasks/create", taskData);
      set((state) => ({
        tasks: { ...state.tasks, tasks: [response.data, ...state.tasks.tasks] },
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  updateTask: async (taskId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.put<Task>(
        `/tasks/${taskId}`,
        updatedData,
      );
      set((state) => ({
        tasks: {
          ...state.tasks,
          tasks: state.tasks.tasks.map((task) =>
            task._id === taskId ? response.data : task,
          ),
        },
        taskDetail:
          state.taskDetail?._id === taskId ? response.data : state.taskDetail,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      await axiosClient.delete(`/tasks/${taskId}`);
      set((state) => ({
        tasks: {
          ...state.tasks,
          tasks: state.tasks.tasks.filter((task) => task._id !== taskId),
        },
        taskDetail: state.taskDetail?._id === taskId ? null : state.taskDetail,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  addAssignees: async (taskId, assigneeEmail) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.post<Task>(
        `/tasks/${taskId}/assignees`,
        {
          email: assigneeEmail,
        },
      );
      set((state) => ({
        taskDetail:
          state.taskDetail?._id === taskId ? response.data : state.taskDetail,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  searchTasks: async (query, projectId, page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get<PaginatedTasks>("/tasks/search", {
        params: { query, projectId, page, limit },
      });
      // eslint-disable-next-line no-console
      console.log("Search results for query", query, response.data);
      set({ taskSearchResults: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  filterTasks: async (filters, page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get<PaginatedTasks>("/tasks", {
        params: { ...filters, page, limit },
      });
      set({ tasks: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },
}));

export default useTaskStore;
