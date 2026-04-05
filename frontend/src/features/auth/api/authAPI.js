import axiosClient from "../../../app/axios";

const registerUser = async (userData) => {
  try {
    const response = await axiosClient.post("/users/create", userData);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to register user");
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axiosClient.post("/users/login", credentials);
    console.log("Login API response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to login user");
  }
};

const getUserCurrent = async () => {
  try {
    const response = await axiosClient.get("/users/me");
    console.log("Get Current User API response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to retrieve user profile",
    );
  }
};

const getAllUser = async () => {
  try {
    const response = await axiosClient.get("/users");
    console.log("Get All Users API response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to retrieve users",
    );
  }
};
const updateUser = async (userId, updatedData) => {
  try {
    const response = await axiosClient.put(`/users/${userId}`, updatedData);
    console.log("Update User API response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update user profile",
    );
  }
};
const changePassword = async (userId, { currentPassword, newPassword }) => {
  try {
    const response = await axiosClient.put(`/users/${userId}/password`, {
      currentPassword,
      newPassword,
    });
    console.log("Change Password API response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to change password",
    );
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axiosClient.delete(`/users/${userId}`);
    console.log("Delete User API response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete user account",
    );
  }
};

const getUserForAddMemberProject = async () => {
  try {
    const response = await axiosClient.get("/users/add-member");
    console.log(
      "Get Users for Add Member Project API response:",
      response.data,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to retrieve users for add member project",
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

const uploadAvatar = async (userId, file, onUploadProgress) => {
  console.log(
    "Uploading avatar for userId at API:",
    userId,
    "with file:",
    file,
  );
  try {
    const formData = new FormData();
    formData.append("avatar", file);
    console.log("FormData prepared for upload:", formData.get("avatar"));
    const response = await axiosClient.post(
      `/users/${userId}/avatar`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (typeof onUploadProgress === "function") {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            onUploadProgress(percentCompleted);
          }
        },
      },
    );
    console.log("Upload Avatar API response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to upload avatar");
  }
};

const deleteAvatar = async (userId) => {
  try {
    const response = await axiosClient.delete(`/users/${userId}/avatar`);
    console.log("Delete Avatar API response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete avatar");
  }
};

export { uploadAvatar, deleteAvatar };
