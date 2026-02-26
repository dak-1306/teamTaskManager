import { AuthContext } from "./AuthContext";
import { useState } from "react";
export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  const value = {
    isLogin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
