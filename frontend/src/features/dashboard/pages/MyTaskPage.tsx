import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

import CardTask from "../../../components/common/CardTask";
import Pagination from "../../../components/common/Pagination";
import { container, item, inViewOptions } from "../../../app/motionConfig";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

type Props = {
  tasks: any;
  loading: boolean;
  fetchTasks: (page: number, limit: number) => void;
};

const MyTaskPage: React.FC<Props> = ({ tasks, loading, fetchTasks }) => {
  const renderSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card key={idx} className="p-4 space-y-3 block h-[140px]">
          <Skeleton className="h-5 w-3/4 bg-muted rounded" />
          <Skeleton className="h-4 w-full bg-muted rounded" />
          <Skeleton className="h-4 w-1/2 bg-muted rounded" />
          <div className="flex justify-end mt-auto pt-4 space-x-2">
            <Skeleton className="w-12 h-6 bg-muted rounded-full" />
            <Skeleton className="w-12 h-6 bg-muted rounded-full" />
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      {loading ? (
        renderSkeleton()
      ) : (
        <Motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl list-none"
        >
          {tasks?.tasks?.length > 0 &&
            tasks.tasks.map((task: any) => (
              <Motion.li key={task._id} variants={item}>
                <Link to={`tasks/${task._id}`}>
                  <CardTask
                    task={task}
                    projectId={task.project._id}
                    variant="member"
                    status={task.status}
                  />
                </Link>
              </Motion.li>
            ))}
        </Motion.ul>
      )}
      {/* Pagination using existing primitives */}
      <Pagination
        currentPage={Number(tasks?.page ?? 1)}
        totalPages={Math.ceil((tasks?.total || 0) / (tasks?.limit || 1))}
        onPageChange={(page) => fetchTasks(page, tasks?.limit || 1)}
      />
    </div>
  );
};

export default MyTaskPage;
