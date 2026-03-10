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

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="projects/:projectId/:variant/tasks/:taskId"
        element={<TaskDetail />}
      />
      <Route path="/projects" element={<ProjectList />} />
      <Route path="/projects/:id/:variant" element={<ProjectDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/projects/search" element={<ProjectSearchPage />} />
      <Route
        path="/projects/:projectId/:variant/tasks/search"
        element={<TaskSearchPage />}
      />
    </Routes>
  );
}
export default Router;
