import { create } from "zustand";

type AuthStore = {
  accessToken: string | null;

  isServerDown: boolean;

  setAccessToken: (token: string | null) => void;

  clearAuth: () => void;

  setIsServerDown: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: localStorage.getItem("token"),

  isServerDown: false,

  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    set({ accessToken: token });
  },

  clearAuth: () => {
    localStorage.removeItem("token");

    set({
      accessToken: null,
      isServerDown: false,
    });
  },

  setIsServerDown: (value) => {
    set({ isServerDown: value });
  },
}));
