import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "../api/authAPI";

import { useAuthStore } from "../store/authStore";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: (userId: string) => userApi.deleteUser(userId),

    onSuccess: async () => {
      clearAuth();

      await queryClient.clear();
    },
  });
};
