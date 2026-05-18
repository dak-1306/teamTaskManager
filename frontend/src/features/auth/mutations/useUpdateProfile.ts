import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "../api/authAPI";

import { authKeys } from "../queries/authKey";

import type { UpdateProfileData } from "../utils/schemas";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateProfileData;
    }) => userApi.updateUser(userId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.me(),
      });
    },
  });
};
