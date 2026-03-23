import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import {
  registerUser,
  loginUser,
  getUserCurrent,
  updateUser,
  changePassword,
  deleteUser,
} from "../api/authAPI";

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLogin(token ? true : false);
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const newUser = await registerUser(userData);
      console.log("User registered:", newUser);
      setError(null);
    } catch (error) {
      console.error("Error registering user:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token || token === "null" || token === "undefined") {
        setIsLogin(false);
        setUserProfile(null);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        const user = await getUserCurrent();
        setUserProfile(user);
        setIsLogin(true);
        setError(null);
      } catch (err) {
        console.error("Error fetching current user:", err.message);
        setError(err.message);
        setIsLogin(false);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await loginUser(credentials);
      if (response.token) {
        localStorage.setItem("token", response.token);
        setIsLogin(true);
        setUserProfile(response.user);
        setError(null);
      } else {
        throw new Error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Error logging in user:", error.message);
      setError(error.message);
      throw error; // Rethrow error để component gọi có thể xử lý
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setUserProfile(null);
  };

  const updateInfoUser = (userId, updatedData) => {
    updateUser(userId, updatedData)
      .then((updatedUser) => {
        console.log("User profile updated:", updatedUser);
        setUserProfile(updatedUser);
        setError(null);
      })
      .catch((error) => {
        console.error("Error updating user profile:", error.message);
        setError(error.message);
      });
  };

  const changePasswordUser = (userId, { currentPassword, newPassword }) => {
    changePassword(userId, { currentPassword, newPassword })
      .then((response) => {
        console.log("Password changed successfully:", response);
        setError(null);
      })
      .catch((error) => {
        console.error("Error changing password:", error.message);
        setError(error.message);
      });
  };

  const deleteUserProvider = (userId) => {
    deleteUser(userId)
      .then((response) => {
        console.log("Account deleted successfully:", response);
        setError(null);
        logout();
      })
      .catch((error) => {
        console.error("Error deleting account:", error.message);
        setError(error.message);
      });
  };

  const value = {
    isLogin,
    loading,
    checkLoginStatus,
    userProfile,
    register,
    login,
    logout,
    updateInfoUser,
    changePasswordUser,
    deleteUserProvider,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
