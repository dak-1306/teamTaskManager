import { create } from "zustand";
import axiosClient from "../../../lib/axios";

type AnyObj = Record<string, any>;

interface ProjectStore {
  projects: AnyObj[];
  memberProject: AnyObj[];
  projectDetail: AnyObj | null;
  projectSearch: AnyObj[];
  projectMemberSearch: AnyObj[];
  loading: boolean;
  error: string | null;

  fetchAllProjects: () => Promise<void>;
  fetchProjectMe: () => Promise<void>;
  fetchProjectById: (projectId: string) => Promise<void>;
  createProject: (projectData: AnyObj) => Promise<void>;
  updateProject: (projectId: string, projectData: AnyObj) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  addMemberProject: (projectId: string, memberEmail: string) => Promise<void>;
  searchProjects: (query: string) => Promise<void>;
  filterProjects: (name: string, date: string) => Promise<void>;
}

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  memberProject: [],
  projectDetail: null,
  projectSearch: [],
  projectMemberSearch: [],
  loading: false,
  error: null,

  // Fetch all projects
  fetchAllProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get("/projects");
      set({ projects: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  // Fetch projects by owner ID (current user)
  fetchProjectMe: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(`/projects/me`);
      set({
        projects: response.data?.projects ?? [],
        memberProject: response.data?.memberProjects ?? [],
        loading: false,
      });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  // Fetch a project by ID
  fetchProjectById: async (projectId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(`/projects/${projectId}`);
      set({ projectDetail: response.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  // Create a new project
  createProject: async (projectData: AnyObj) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.post("/projects/create", projectData);
      set((state) => ({
        projects: [...state.projects, response.data],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  // Update a project
  updateProject: async (projectId: string, projectData: AnyObj) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.put(
        `/projects/${projectId}`,
        projectData,
      );
      set((state) => ({
        projects: state.projects.map((project) =>
          project._id === projectId ? response.data : project,
        ),
        projectDetail:
          state.projectDetail?._id === projectId
            ? response.data
            : state.projectDetail,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  // Delete a project
  deleteProject: async (projectId: string) => {
    set({ loading: true, error: null });
    try {
      await axiosClient.delete(`/projects/${projectId}`);
      set((state) => ({
        projects: state.projects.filter((project) => project._id !== projectId),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  // Add a member to a project
  addMemberProject: async (projectId: string, memberEmail: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.post(
        `/projects/${projectId}/members`,
        { memberEmail },
      );
      set((state) => ({
        projectDetail:
          state.projectDetail?._id === projectId
            ? response.data
            : state.projectDetail,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  // Search projects by name
  searchProjects: async (query: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(
        `/projects/search?query=${encodeURIComponent(query)}`,
      );
      set({
        projectSearch: response.data?.ownedProjects ?? [],
        projectMemberSearch: response.data?.memberProjects ?? [],
        loading: false,
      });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },

  // Filter projects by name, status, or date
  filterProjects: async (name: string, date: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(
        `/projects?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}`,
      );
      set({
        projects: response.data?.ownedProjects ?? [],
        memberProject: response.data?.memberProjects ?? [],
        loading: false,
      });
    } catch (err: any) {
      set({ error: err?.message ?? String(err), loading: false });
    }
  },
}));

export default useProjectStore;
