import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  registerUser,
  loginUser,
  getUserCurrent,
  updateUser,
  changePassword,
  deleteUser,
  getUserForAddMemberProject,
  uploadAvatar,
  deleteAvatar,
} from "../api/authAPI";

type AnyObj = Record<string, any>;

type AuthContextType = {
  isLogin: boolean;
  loading: boolean;
  checkLoginStatus: () => void;
  userProfile: AnyObj | null;
  usersForAddMember: AnyObj[];
  registerContext: (userData: AnyObj) => Promise<void>;
  login: (credentials: AnyObj) => Promise<void>;
  logout: () => void;
  updateInfoUser: (userId: string, updatedData: AnyObj) => void;
  changePasswordUser: (
    userId: string,
    payload: { currentPassword: string; newPassword: string },
  ) => void;
  deleteUserProvider: (userId: string) => void;
  getUsersForAddMemberProvider: () => Promise<AnyObj[]>;
  uploadAvatarProvider: (
    userId: string,
    file: File,
    onProgress?: (p: number) => void,
  ) => Promise<AnyObj>;
  deleteAvatarProvider: (userId: string) => Promise<AnyObj>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userProfile, setUserProfile] = useState<AnyObj | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usersForAddMember, setUsersForAddMember] = useState<AnyObj[]>([]);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  };

  const uploadAvatarProvider = async (
    userId: string,
    file: File,
    onProgress?: (p: number) => void,
  ) => {
    try {
      const res = await uploadAvatar(userId, file, onProgress);
      if (res?.user) setUserProfile(res.user);
      setError(null);
      return res;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Error uploading avatar:", msg);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAvatarProvider = async (userId: string) => {
    try {
      const res = await deleteAvatar(userId);
      if (res?.user) setUserProfile(res.user);
      setError(null);
      return res;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Error deleting avatar:", msg);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerContext = async (userData: AnyObj) => {
    try {
      setLoading(true);
      await registerUser(userData);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Error registering user:", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const user = await getUserCurrent();
      setUserProfile(user);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Error fetching user profile:", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      fetchUserProfile();
      getUsersForAddMemberProvider();
    } else {
      setIsLogin(false);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (credentials: AnyObj) => {
    try {
      setLoading(true);
      const response = await loginUser(credentials);
      if (response?.token) {
        localStorage.setItem("token", response.token);
        setIsLogin(true);
        setUserProfile(response.user ?? null);
        setError(null);
      } else {
        throw new Error("Login failed: No token received");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Error logging in user:", msg);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setUserProfile(null);
  };

  const updateInfoUser = (userId: string, updatedData: AnyObj) => {
    updateUser(userId, updatedData)
      .then((updatedUser) => {
        setUserProfile(updatedUser);
        setError(null);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("Error updating user profile:", msg);
        setError(msg);
      });
  };

  const changePasswordUser = (
    userId: string,
    {
      currentPassword,
      newPassword,
    }: { currentPassword: string; newPassword: string },
  ) => {
    changePassword(userId, { currentPassword, newPassword })
      .then(() => {
        setError(null);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("Error changing password:", msg);
        setError(msg);
      });
  };

  const deleteUserProvider = (userId: string) => {
    deleteUser(userId)
      .then(() => {
        setError(null);
        logout();
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("Error deleting account:", msg);
        setError(msg);
      });
  };

  const getUsersForAddMemberProvider = async () => {
    try {
      const users = await getUserForAddMemberProject();
      setUsersForAddMember(users);
      return users;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Error fetching users for add member project:", msg);
      throw err;
    }
  };

  const value: AuthContextType = {
    isLogin,
    loading,
    checkLoginStatus,
    userProfile,
    usersForAddMember,
    registerContext,
    login,
    logout,
    updateInfoUser,
    changePasswordUser,
    deleteUserProvider,
    getUsersForAddMemberProvider,
    uploadAvatarProvider,
    deleteAvatarProvider,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export default AuthContext;
