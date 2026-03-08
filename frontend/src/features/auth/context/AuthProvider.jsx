import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";

import {
  registerUser,
  loginUser,
  getUserCurrent,
  updateUser,
  changePassword,
} from "../api/authAPI";

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLogin(token ? true : false);
  };

  const register = async (userData) => {
    try {
      const newUser = await registerUser(userData);
      console.log("User registered:", newUser);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserCurrent()
        .then((user) => {
          setUserProfile(user);
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
        });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      console.log("Login successful:", response);
      localStorage.setItem("token", response.token);
      setUserProfile(response.user);
      setIsLogin(true);
    } catch (error) {
      console.error("Error logging in user:", error);
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
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  const changePasswordUser = (userId, { currentPassword, newPassword }) => {
    changePassword(userId, { currentPassword, newPassword })
      .then((response) => {
        console.log("Password changed successfully:", response);
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  const value = {
    isLogin,
    checkLoginStatus,
    userProfile,
    register,
    login,
    logout,
    updateInfoUser,
    changePasswordUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
