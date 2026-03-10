import axiosClient from "../../../app/axios";
import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  taskSearchResults: [],
  taskDetail: null,
  loading: false,
  error: null,
  // Fetch tasks for the current user
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get("/tasks/me");
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  // fetch tasks for a specific project
  fetchTasksByProjectId: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(`/tasks/projects/${projectId}`);
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  // fetch task by ID
  fetchTaskById: async (taskId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(`/tasks/${taskId}`);
      set({ taskDetail: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  // Create a new task
  createTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      console.log("Creating task with data:", taskData);
      const response = await axiosClient.post("/tasks/create", taskData);
      set((state) => ({
        tasks: [...state.tasks, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  // Update an existing task
  updateTask: async (taskId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.put(`/tasks/${taskId}`, updatedData);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === taskId ? response.data : task,
        ),
        taskDetail:
          state.taskDetail?._id === taskId ? response.data : state.taskDetail,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  // Delete a task
  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      await axiosClient.delete(`/tasks/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId),
        taskDetail: state.taskDetail?._id === taskId ? null : state.taskDetail,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add assignees to a task
  addAssignees: async (taskId, assigneeEmail) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.post(`/tasks/${taskId}/assignees`, {
        email: assigneeEmail,
      });
      set((state) => ({
        taskDetail:
          state.taskDetail?._id === taskId ? response.data : state.taskDetail,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Search tasks by query
  searchTasks: async (query, projectId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get("/tasks/search", {
        params: { query, projectId },
      });
      set({ taskSearchResults: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Filter tasks by status, priority, or sort by date
  filterTasks: async (filters) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get("/tasks", { params: filters });
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useTaskStore;
