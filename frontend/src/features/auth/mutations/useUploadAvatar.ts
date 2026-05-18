import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "../api/authAPI";

import { authKeys } from "../queries/authKey";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      file,
      onProgress,
    }: {
      userId: string;
      file: File;
      onProgress?: (progress: number) => void;
    }) => userApi.uploadAvatar(userId, file, onProgress),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.me(),
      });
    },
  });
};
