import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/features/auth/api/authAPI";

import { authKeys } from "./authKey";

import { useAuthStore } from "../store/authStore";

export const useCurrentUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: authKeys.me(),

    queryFn: userApi.getCurrentUser,

    enabled: Boolean(accessToken),

    retry: false,
  });
};
