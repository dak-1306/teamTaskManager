import React, { ReactNode, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import AuthBackground from "../features/auth/components/AuthBackground";
import Landing from "../features/landing/Landing";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import Dashboard from "../features/dashboard/pages/Dashboard";
import TaskDetail from "../features/task/pages/TaskDetail";
import ProjectList from "../features/project/pages/ProjectList";
import ProjectDetail from "../features/project/pages/ProjectDetail";
import Profile from "../features/auth/pages/profile";
import ProjectSearchPage from "../features/project/pages/ProjectSearchPage";
import TaskSearchPage from "../features/task/pages/TaskSearchPage";
import ServerWakingUp from "../features/error/ServerError";

import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "../features/auth/queries/useCurrentUser";
import { useAuthStore } from "@/features/auth/store/authStore";

import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const ProtectedRoute: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { data: currentUser, isLoading, error } = useCurrentUser();
  const setIsServerDown = useAuthStore((state) => state.setIsServerDown);
  useEffect(() => {
    if (error) {
      toast.error("Failed to load user data. Please try again later.");
    }
    if (error?.message === "Network Error") {
      setIsServerDown(true);
    }
  }, [error]);
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  } // or a spinner component
  if (!currentUser) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

function Router() {
  const isServerDown = useAuthStore((state) => state.isServerDown);
  const navigate = useNavigate();

  useEffect(() => {
    if (isServerDown) {
      toast.error("Server is currently down. Please try again later.");
      navigate("/server-waking-up");
    }
  }, [isServerDown]);

  return (
    <Routes>
      <Route element={<AuthBackground />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tasks/:taskId"
          element={
            <ProtectedRoute>
              <TaskDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/:projectId/:variant/tasks/:taskId"
          element={
            <ProtectedRoute>
              <TaskDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id/:variant"
          element={
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/search"
          element={
            <ProtectedRoute>
              <ProjectSearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/:variant/tasks/search"
          element={
            <ProtectedRoute>
              <TaskSearchPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/" element={<Landing />} />
      <Route path="/server-waking-up" element={<ServerWakingUp />} />
    </Routes>
  );
}
export default Router;
