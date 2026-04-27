import { useEffect, useMemo, useCallback } from "react";

import OverviewPage from "./OverviewPage";
import MyTaskPage from "./MyTaskPage";
import RecentProjectPage from "./RecentProjectPage";
import PieChartStatus from "../components/PieChartStatus";
import TaskLineChart from "../components/TaskLineChart";
import TaskLineChartByDay from "../components/TaskLineChartByDay";
import SkeletonDashboard from "./SkeletonDashboard";
import EmptyDashboard from "../components/EmptyDashboard";

import useProjectStore from "../../project/stores/projectStore";
import useTaskStore from "../../task/stores/taskStore";

export default function Dashboard() {
  const { projects, fetchProjectMe, loading } = useProjectStore() as any;
  const { tasks, fetchTasks, taskOverview, fetchTaskOverview } =
    useTaskStore() as any;

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
    (page: number, limit: number) => {
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
    return <SkeletonDashboard />;
  }
  if (
    !loading &&
    projects.length === 0 &&
    tasks.tasks.length === 0 &&
    taskOverview.totalTasks === 0
  ) {
    return <EmptyDashboard />;
  } else {
    return (
      <>
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
        <div className="flex items-center space-x-4 mt-4 mb-4">
          <PieChartStatus data={dataPiaChartStatus} totalData={totalTasks} />
          <TaskLineChartByDay tasksByDay={tasksByDay} />
        </div>
        <hr className="border-gray-300" />
        <TaskLineChart tasksByMonth={tasksByMonth} />

        <hr className="border-gray-300" />
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
      </>
    );
  }
}
