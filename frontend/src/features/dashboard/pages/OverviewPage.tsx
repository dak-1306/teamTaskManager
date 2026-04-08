import React from "react";
import { ChartBar, CheckCircle, Clock, FolderOpenDot } from "lucide-react";
import { motion as Motion } from "framer-motion";

import OverviewCard from "../components/OverviewCard";
import { container, item, inViewOptions } from "../../../app/motionConfig";

type Props = {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  loading: boolean;
};

const OverviewPage: React.FC<Props> = ({
  totalProjects,
  totalTasks,
  completedTasks,
  inProgressTasks,
  loading,
}) => {
  return (
    <Motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={inViewOptions}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto max-w-7xl"
    >
      {!loading && (
        <>
          <Motion.div variants={item}>
            <OverviewCard
              title="Total Projects"
              value={totalProjects}
              icon={<FolderOpenDot size={24} />}
              color="totalProject"
            />
          </Motion.div>
          <Motion.div variants={item}>
            <OverviewCard
              title="Total Tasks"
              value={totalTasks}
              icon={<ChartBar size={24} />}
              color="totalTask"
            />
          </Motion.div>
          <Motion.div variants={item}>
            <OverviewCard
              title="Completed Tasks"
              value={completedTasks}
              icon={<CheckCircle size={24} />}
              color="completedTask"
            />
          </Motion.div>
          <Motion.div variants={item}>
            <OverviewCard
              title="In Progress Tasks"
              value={inProgressTasks}
              icon={<Clock size={24} />}
              color="progressTask"
            />
          </Motion.div>
        </>
      )}
    </Motion.div>
  );
};

export default OverviewPage;
