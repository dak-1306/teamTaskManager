import MainLayout from "../../../shared/layout/MainLayout";
import { useEffect, useMemo, useCallback } from "react";

import OverviewPage from "./OverviewPage";
import MyTaskPage from "./MyTaskPage";
import RecentProjectPage from "./RecentProjectPage";
import PieChartStatus from "../components/PieChartStatus";
import TaskLineChart from "../components/TaskLineChart";
import TaskLineChartByDay from "../components/TaskLineChartByDay";
import SkeletonDashboard from "./SkeletonDashboard";

import useProjectStore from "../../project/stores/projectStore";
import useTaskStore from "../../task/stores/taskStore";

function Dashboard() {
  const { projects, fetchProjectMe, loading } = useProjectStore();
  const { tasks, fetchTasks, taskOverview, fetchTaskOverview } = useTaskStore();

  useEffect(() => {
    fetchTasks(tasks.page, tasks.limit);
  }, [fetchTasks, tasks.page, tasks.limit]);

  useEffect(() => {
    fetchProjectMe();
  }, [fetchProjectMe]);

  useEffect(() => {
    fetchTaskOverview();
  }, [fetchTaskOverview]);

  const tasksForMyTasks = useMemo(() => tasks, [tasks]);
  const fetchTasksForMyTasks = useCallback(
    (page, limit) => {
      fetchTasks(page, limit);
    },
    [fetchTasks],
  );

  const totalProjects = useMemo(() => projects.length, [projects]);
  const totalTasks = useMemo(() => taskOverview.totalTasks, [taskOverview]);
  const completedTasks = useMemo(
    () => taskOverview.completedTasks,
    [taskOverview],
  );
  const inProgressTasks = useMemo(
    () => taskOverview.inProgressTasks,
    [taskOverview],
  );
  const todoTasks = useMemo(() => taskOverview.todoTasks, [taskOverview]);
  const tasksByMonth = useMemo(() => taskOverview.tasksByMonth, [taskOverview]);
  const tasksByDay = useMemo(() => taskOverview.tasksByDay, [taskOverview]);
  const dataPiaChartStatus = useMemo(
    () => [
      { name: "Completed", value: completedTasks },
      { name: "In Progress", value: inProgressTasks },
      { name: "Todo", value: todoTasks },
    ],
    [completedTasks, inProgressTasks, todoTasks],
  );

  if (loading) {
    return (
      <MainLayout>
        <SkeletonDashboard />
      </MainLayout>
    );
  }
  return (
    <MainLayout >
      <h1 className="text-2xl font-bold text-foreground text-center">
        Dashboard
      </h1>
      <OverviewPage
        totalProjects={totalProjects}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
        loading={loading}
      />
      <hr className="border-gray-300" />
      <h2 className="text-xl font-bold text-foreground text-center">
        Task Overview
      </h2>
      <div className="flex items-center space-x-4 mt-4 mb-4">
        <PieChartStatus data={dataPiaChartStatus} totalData={totalTasks} />
        <TaskLineChartByDay tasksByDay={tasksByDay} />
      </div>
      <TaskLineChart tasksByMonth={tasksByMonth} />

      <h2 className="text-xl font-bold text-foreground text-center">
        My Tasks
      </h2>
      <MyTaskPage
        tasks={tasksForMyTasks}
        loading={loading}
        fetchTasks={fetchTasksForMyTasks}
      />
      <hr className="border-gray-300" />
      <h2 className="text-xl font-bold text-foreground text-center">
        Recent Projects
      </h2>
      <RecentProjectPage projects={projects} loading={loading} />
    </MainLayout>
  );
}
export default Dashboard;
