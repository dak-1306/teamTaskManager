import React from "react";
import { ChartBar, CheckCircle, Clock, FolderOpenDot } from "lucide-react";
import { motion as Motion } from "framer-motion";

import OverviewCard from "../components/OverviewCard";
import { container, item, inViewOptions } from "../../../app/motionConfig";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

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
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto max-w-7xl w-full">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card key={idx}>
          <div className="flex items-center gap-6 mx-auto p-6">
            <Skeleton className="h-12 w-12 rounded-full bg-muted dark:bg-muted" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 bg-muted dark:bg-muted" />
              <Skeleton className="h-8 w-12 bg-muted dark:bg-muted" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      {loading ? (
        renderSkeleton()
      ) : (
        <Motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto max-w-7xl w-full"
        >
          <Motion.div variants={item}>
            <OverviewCard
              title="Total Projects"
              value={totalProjects ? totalProjects : 0}
              icon={<FolderOpenDot size={24} />}
              color="totalProject"
            />
          </Motion.div>
          <Motion.div variants={item}>
            <OverviewCard
              title="Total Tasks"
              value={totalTasks ? totalTasks : 0}
              icon={<ChartBar size={24} />}
              color="totalTask"
            />
          </Motion.div>
          <Motion.div variants={item}>
            <OverviewCard
              title="Completed Tasks"
              value={completedTasks ? completedTasks : 0}
              icon={<CheckCircle size={24} />}
              color="completedTask"
            />
          </Motion.div>
          <Motion.div variants={item}>
            <OverviewCard
              title="In Progress Tasks"
              value={inProgressTasks ? inProgressTasks : 0}
              icon={<Clock size={24} />}
              color="progressTask"
            />
          </Motion.div>
        </Motion.div>
      )}
    </>
  );
};

export default OverviewPage;
