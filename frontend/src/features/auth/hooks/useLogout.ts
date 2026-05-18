import { useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "../store/authStore";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const clearAuth = useAuthStore((state) => state.clearAuth);

  return () => {
    clearAuth();

    queryClient.clear();
  };
};
