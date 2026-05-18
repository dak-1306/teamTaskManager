import { useMutation } from "@tanstack/react-query";

import { userApi } from "../api/authAPI";

import type { RegisterFormData } from "@/features/auth/utils/schemas";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterFormData) => userApi.registerUser(data),
    onSuccess: () => {
      // Handle successful registration, e.g., show a success message or redirect to login
    },
  });
};
