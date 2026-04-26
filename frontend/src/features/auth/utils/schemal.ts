import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),

  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Tên người dùng tối thiểu 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export const updateProfileSchema = z.object({
  username: z.string().min(3, "Tên người dùng tối thiểu 3 ký tự").optional(),
  email: z.string().email("Email không hợp lệ").optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    newPassword: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirmNewPassword: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmNewPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
