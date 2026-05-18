import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "../api/authAPI";

import { useAuthStore } from "../store/authStore";

import type { LoginFormData } from "@/features/auth/utils/schemas";

import { authKeys } from "../queries/authKey";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: (data: LoginFormData) => userApi.loginUser(data),

    onSuccess: (response) => {
      console.log("Login successful:", response);
      setAccessToken(response.token);

      queryClient.invalidateQueries({
        queryKey: authKeys.me(),
      });
    },
  });
};
