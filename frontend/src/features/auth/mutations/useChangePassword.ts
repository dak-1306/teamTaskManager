import { useMutation } from "@tanstack/react-query";

import { userApi } from "../api/authAPI";

import type { ChangePasswordData } from "../utils/schemas";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: ChangePasswordData;
    }) => userApi.changePassword(userId, data),
  });
};
