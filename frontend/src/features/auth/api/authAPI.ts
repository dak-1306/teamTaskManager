import axiosClient from "../../../lib/axios";
import type { AxiosProgressEvent } from "axios";

type AnyObj = Record<string, any>;

const safeMessage = (err: unknown) =>
  err instanceof Error ? err.message : String(err);

const registerUser = async (userData: AnyObj) => {
  try {
    const response = await axiosClient.post("/users/create", userData);
    return response.data;
  } catch (err: unknown) {
    throw new Error(safeMessage(err) || "Failed to register user");
  }
};

const loginUser = async (credentials: AnyObj) => {
  try {
    const response = await axiosClient.post("/users/login", credentials);
    return response.data;
  } catch (err: unknown) {
    throw new Error(safeMessage(err) || "Failed to login user");
  }
};

const getUserCurrent = async () => {
  try {
    const response = await axiosClient.get("/users/me");
    return response.data;
  } catch (err: unknown) {
    throw new Error(safeMessage(err) || "Failed to retrieve user profile");
  }
};

const getAllUser = async () => {
  try {
    const response = await axiosClient.get("/users");
    return response.data;
  } catch (err: unknown) {
    throw new Error(safeMessage(err) || "Failed to retrieve users");
  }
};

const updateUser = async (userId: string, updatedData: AnyObj) => {
  try {
    const response = await axiosClient.put(`/users/${userId}`, updatedData);
    return response.data;
  } catch (err: unknown) {
    throw new Error(safeMessage(err) || "Failed to update user profile");
  }
};

const changePassword = async (
  userId: string,
  {
    currentPassword,
    newPassword,
  }: { currentPassword: string; newPassword: string },
) => {
  try {
    const response = await axiosClient.put(`/users/${userId}/password`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (err: unknown) {
    throw new Error(safeMessage(err) || "Failed to change password");
  }
};

const deleteUser = async (userId: string) => {
  try {
    const response = await axiosClient.delete(`/users/${userId}`);
    return response.data;
  } catch (err: unknown) {
    throw new Error(safeMessage(err) || "Failed to delete user account");
  }
};

const getUserForAddMemberProject = async () => {
  try {
    const response = await axiosClient.get("/users/add-member");
    return response.data;
  } catch (err: unknown) {
    throw new Error(
      safeMessage(err) || "Failed to retrieve users for add member project",
    );
  }
};

export {
  registerUser,
  loginUser,
  getAllUser,
  getUserForAddMemberProject,
  getUserCurrent,
  updateUser,
  changePassword,
  deleteUser,
};

const uploadAvatar = async (
  userId: string,
  file: File,
  onUploadProgress?: (p: number) => void,
) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await axiosClient.post(
      `/users/${userId}/avatar`,
      formData,
      {
        onUploadProgress: (progressEvent?: AxiosProgressEvent) => {
          if (typeof onUploadProgress === "function") {
            const loaded =
              typeof progressEvent?.loaded === "number"
                ? progressEvent!.loaded
                : 0;
            const total =
              typeof progressEvent?.total === "number" &&
              progressEvent!.total > 0
                ? progressEvent!.total
                : 1;
            const percentCompleted = Math.round((loaded * 100) / total);
            onUploadProgress(percentCompleted);
          }
        },
      },
    );
    return response.data;
  } catch (err: unknown) {
    throw new Error(safeMessage(err) || "Failed to upload avatar");
  }
};

const deleteAvatar = async (userId: string) => {
  try {
    const response = await axiosClient.delete(`/users/${userId}/avatar`);
    return response.data;
  } catch (err: unknown) {
    throw new Error(safeMessage(err) || "Failed to delete avatar");
  }
};

export { uploadAvatar, deleteAvatar };
