import { create } from "zustand";
import axiosClient from "../../../app/axios";

const useProjectStore = create((set) => ({
  projects: [],
  memberProject: [],
  projectDetail: null,
  loading: false,
  error: null,

  //   Fetch all projects
  fetchAllProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get("/projects");
      set({ projects: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  // Fetch projects by owner ID (current user)
  fetchProjectMe: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(`/projects/me`);
      set({
        projects: response.data.projects,
        memberProject: response.data.memberProjects,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  //   Fetch a project by ID
  fetchProjectById: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(`/projects/${projectId}`);
      set({ projectDetail: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  //   Create a new project
  createProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.post("/projects/create", projectData);
      set((state) => ({
        projects: [...state.projects, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  //   Update a project
  updateProject: async (projectId, projectData) => {
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
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  //   Delete a project
  deleteProject: async (projectId) => {
    set({ loading: true, error: null });
    try {
      await axiosClient.delete(`/projects/${projectId}`);
      set((state) => ({
        projects: state.projects.filter((project) => project._id !== projectId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  //  Add a member to a project
  addMemberProject: async (projectId, memberEmail) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.post(
        `/projects/${projectId}/members`,
        { memberEmail: memberEmail },
      );
      set((state) => ({
        projectDetail:
          state.projectDetail?._id === projectId
            ? response.data
            : state.projectDetail,

        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProjectStore;
