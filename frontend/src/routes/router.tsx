import React, { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../features/landing/Landing";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/dashboard/pages/Dashboard";
import TaskDetail from "../features/task/pages/TaskDetail";
import ProjectList from "../features/project/pages/ProjectList";
import ProjectDetail from "../features/project/pages/ProjectDetail";
import Profile from "../features/auth/pages/profile";
import ProjectSearchPage from "../features/project/pages/ProjectSearchPage";
import TaskSearchPage from "../features/task/pages/TaskSearchPage";

import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/useAuth";

const ProtectedRoute: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { isLogin, loading } = useAuth();

  if (loading) return null; // or a spinner component
  if (!isLogin) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
    </Routes>
  );
}
export default Router;
