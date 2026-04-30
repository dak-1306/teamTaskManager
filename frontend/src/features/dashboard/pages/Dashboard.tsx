import { useEffect, useMemo, useCallback } from "react";

import OverviewPage from "./OverviewPage";
import MyTaskPage from "./MyTaskPage";
import RecentProjectPage from "./RecentProjectPage";
import PieChartStatus from "../components/PieChartStatus";
import TaskLineChart from "../components/TaskLineChart";
import TaskLineChartByDay from "../components/TaskLineChartByDay";
import EmptyDashboard from "../components/EmptyDashboard";

import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

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

  const renderChartSkeletons = () => (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mb-4">
        <Card className="p-4 lg:col-span-1">
          <Skeleton className="h-6 w-1/3 mb-6 rounded bg-muted dark:bg-muted" />
          <div className="flex items-center justify-center">
            <Skeleton className="rounded-full w-40 h-40 bg-muted dark:bg-muted" />
          </div>
        </Card>
        <Card className="p-4 lg:col-span-1">
          <Skeleton className="h-6 w-1/3 mb-6 rounded bg-muted dark:bg-muted" />
          <Skeleton className="h-64 w-full rounded bg-muted dark:bg-muted" />
        </Card>
      </div>
      <hr className="border-gray-100 dark:border-gray-800" />
      <Card className="p-4 mt-4 mb-4">
        <Skeleton className="h-6 w-1/4 mb-6 rounded bg-muted dark:bg-muted" />
        <Skeleton className="h-64 w-full rounded bg-muted dark:bg-muted" />
      </Card>
    </>
  );

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
        <h1 className="text-2xl font-bold text-foreground text-center mb-6">
          Dashboard
        </h1>
        <OverviewPage
          totalProjects={totalProjects}
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          inProgressTasks={inProgressTasks}
          loading={loading}
        />
        <hr className="border-gray-100 dark:border-gray-800 my-4" />
        
        {loading ? (
          renderChartSkeletons()
        ) : (
          <>
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-4 mb-4">
              <div className="w-full lg:w-1/2">
                <PieChartStatus data={dataPiaChartStatus} totalData={totalTasks} />
              </div>
              <div className="w-full lg:w-1/2">
                <TaskLineChartByDay tasksByDay={tasksByDay} />
              </div>
            </div>
            <hr className="border-gray-100 dark:border-gray-800 my-4" />
            <TaskLineChart tasksByMonth={tasksByMonth} />
          </>
        )}

        <hr className="border-gray-100 dark:border-gray-800 my-4" />
        <h2 className="text-xl font-bold text-foreground text-center mb-4">
          My Tasks
        </h2>

        <MyTaskPage
          tasks={tasksForMyTasks}
          loading={loading}
          fetchTasks={fetchTasksForMyTasks}
        />
        <hr className="border-gray-100 dark:border-gray-800 my-4" />
        <h2 className="text-xl font-bold text-foreground text-center mb-4">
          Recent Projects
        </h2>
        <RecentProjectPage projects={projects} loading={loading} />
      </>
    );
  }
}
