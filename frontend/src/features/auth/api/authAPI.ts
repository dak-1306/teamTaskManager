import type { AxiosProgressEvent } from "axios";

import axiosClient from "../../../lib/axios";

import type {
  ChangePasswordData,
  LoginFormData,
  RegisterFormData,
  UpdateProfileData,
} from "@/features/auth/utils/schemas";

import type { UserProfile } from "@/features/auth/utils/type";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

const handleRequest = async <T>(
  request: Promise<{ data: T }>,
  fallbackMessage: string,
): Promise<T> => {
  try {
    const response = await request;

    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, fallbackMessage));
  }
};

// =========================
// Auth
// =========================

const registerUser = async (payload: RegisterFormData) => {
  return handleRequest<UserProfile>(
    axiosClient.post("/users/create", payload),
    "Đăng ký tài khoản thất bại",
  );
};

const loginUser = async (payload: LoginFormData) => {
  return handleRequest<{
    token: string;
    user: UserProfile;
    message: string;
  }>(axiosClient.post("/users/login", payload), "Đăng nhập thất bại");
};

// =========================
// User
// =========================

const getCurrentUser = async () => {
  return handleRequest<UserProfile>(
    axiosClient.get("/users/me"),
    "Không thể lấy thông tin người dùng",
  );
};

const getAllUsers = async () => {
  return handleRequest<UserProfile[]>(
    axiosClient.get("/users"),
    "Không thể lấy danh sách người dùng",
  );
};

const getUsersForAddMemberProject = async () => {
  return handleRequest<UserProfile[]>(
    axiosClient.get("/users/add-member"),
    "Không thể lấy danh sách thành viên",
  );
};

const updateUser = async (userId: string, payload: UpdateProfileData) => {
  return handleRequest<UserProfile>(
    axiosClient.put(`/users/${userId}`, payload),
    "Cập nhật thông tin thất bại",
  );
};

const deleteUser = async (userId: string) => {
  return handleRequest<null>(
    axiosClient.delete(`/users/${userId}`),
    "Xóa tài khoản thất bại",
  );
};

// =========================
// Password
// =========================

const changePassword = async (userId: string, payload: ChangePasswordData) => {
  return handleRequest<null>(
    axiosClient.put(`/users/${userId}/password`, {
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
      confirmNewPassword: payload.confirmNewPassword,
    }),
    "Đổi mật khẩu thất bại",
  );
};

// =========================
// Avatar
// =========================

const uploadAvatar = async (
  userId: string,
  file: File,
  onUploadProgress?: (progress: number) => void,
) => {
  const formData = new FormData();

  formData.append("avatar", file);

  return handleRequest<UserProfile>(
    axiosClient.post(`/users/${userId}/avatar`, formData, {
      onUploadProgress: (event?: AxiosProgressEvent) => {
        if (!onUploadProgress) return;

        const loaded = event?.loaded ?? 0;
        const total = event?.total ?? 1;

        const progress = Math.round((loaded * 100) / total);

        onUploadProgress(progress);
      },
    }),
    "Tải ảnh đại diện thất bại",
  );
};

const deleteAvatar = async (userId: string) => {
  return handleRequest<UserProfile>(
    axiosClient.delete(`/users/${userId}/avatar`),
    "Xóa ảnh đại diện thất bại",
  );
};

export const userApi = {
  registerUser,
  loginUser,

  getCurrentUser,
  getAllUsers,
  getUsersForAddMemberProject,
  updateUser,
  deleteUser,

  changePassword,

  uploadAvatar,
  deleteAvatar,
};
