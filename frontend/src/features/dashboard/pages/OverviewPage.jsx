import { useEffect } from "react";

import { ChartBar, CheckCircle, Clock, FolderOpenDot } from "lucide-react";
import { motion as Motion } from "motion/react";

import OverviewCard from "../components/OverviewCard";
import SkeletonOverview from "./SkeletonOverview";

import useProjectStore from "../../project/stores/projectStore";
import useTaskStore from "../../task/stores/taskStore";
import { container, item } from "../../../app/motionConfig";

function OverviewPage() {
  const { projects, fetchProjectMe, loading } = useProjectStore();
  const { taskOverview, fetchTaskOverview } = useTaskStore();

  useEffect(() => {
    fetchProjectMe();
  }, [fetchProjectMe]);

  useEffect(() => {
    fetchTaskOverview();
  }, [fetchTaskOverview]);

  const totalProjects = projects.length;
  const totalTasks = taskOverview.totalTasks;
  const completedTasks = taskOverview.completedTasks;
  const inProgressTasks = taskOverview.inProgressTasks;

  if (loading) {
    return <SkeletonOverview />;
  }

  return (
    <Motion.div
      variants={container}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto max-w-7xl"
    >
      {!loading && (
        <>
          <Motion.div variants={item}>
            <OverviewCard
              title="Total Projects"
              value={totalProjects}
              icon={<FolderOpenDot size={24} />}
            />
          </Motion.div>
          <Motion.div variants={item}>
            <OverviewCard
              title="Total Tasks"
              value={totalTasks}
              icon={<ChartBar size={24} />}
            />
          </Motion.div>
          <Motion.div variants={item}>
            <OverviewCard
              title="Completed Tasks"
              value={completedTasks}
              icon={<CheckCircle size={24} />}
            />
          </Motion.div>
          <Motion.div variants={item}>
            <OverviewCard
              title="In Progress Tasks"
              value={inProgressTasks}
              icon={<Clock size={24} />}
            />
          </Motion.div>
        </>
      )}
    </Motion.div>
  );
}

export default OverviewPage;
