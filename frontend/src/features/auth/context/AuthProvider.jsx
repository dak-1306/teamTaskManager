import { AuthContext } from "./AuthContext";
import { useState } from "react";

import { getAllUser, registerUser, loginUser } from "../api/authAPI";

// import { getAllUser, registerUser } from "../services/authService";
export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLogin(token ? true : false);
  };

  const profile = async () => {
    try {
      const users = await getAllUser();
      console.log("Profile API response:", users);
      setUserProfile(users);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await registerUser(userData);
      console.log("User registered:", newUser);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      console.log("Login successful:", response);
      localStorage.setItem("token", response.token);
      setIsLogin(true);
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  const value = {
    isLogin,
    checkLoginStatus,
    userProfile,
    profile,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
