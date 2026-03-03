import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";

import { registerUser, loginUser, getUserCurrent } from "../api/authAPI";

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

  const value = {
    isLogin,
    checkLoginStatus,
    userProfile,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
