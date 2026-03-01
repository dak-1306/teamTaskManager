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

export { registerUser, loginUser, getAllUser };
