import { useEffect } from "react";

import { ChartBar, CheckCircle, Clock, FolderOpenDot } from "lucide-react";

import OverviewCard from "../components/OverviewCard";

import useProjectStore from "../../project/stores/projectStore";
import useTaskStore from "../../task/stores/taskStore";

function OverviewPage() {
  const { projects, fetchProjectMe } = useProjectStore();
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchProjectMe();
  }, [fetchProjectMe]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "doing",
  ).length;

  console.log("Projects in OverviewPage:", projects);
  console.log("Tasks in OverviewPage:", tasks);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto max-w-7xl">
      <OverviewCard
        title="Total Projects"
        value={totalProjects}
        icon={<FolderOpenDot size={24} />}
      />
      <OverviewCard
        title="Total Tasks"
        value={totalTasks}
        icon={<ChartBar size={24} />}
      />
      <OverviewCard
        title="Completed Tasks"
        value={completedTasks}
        icon={<CheckCircle size={24} />}
      />
      <OverviewCard
        title="In Progress Tasks"
        value={inProgressTasks}
        icon={<Clock size={24} />}
      />
    </div>
  );
}

export default OverviewPage;
