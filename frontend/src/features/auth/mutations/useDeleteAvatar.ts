import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "../api/authAPI";

import { authKeys } from "../queries/authKey";

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => userApi.deleteAvatar(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.me(),
      });
    },
  });
};
