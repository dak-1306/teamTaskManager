import React from "react";
import { motion as Motion } from "framer-motion";

import CardProject from "../../../components/common/CardProject";
import { container, item, inViewOptions } from "../../../app/motionConfig";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

type Props = {
  projects: any[];
  loading: boolean;
};

const RecentProjectPage: React.FC<Props> = ({ projects, loading }) => {
  const renderSkeleton = () => (
    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl list-none pb-10">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card key={idx} className="p-4 space-y-3 block h-[120px]">
          <Skeleton className="h-6 w-3/4 bg-muted rounded" />
          <div className="flex justify-between items-center mt-auto pt-4">
            <Skeleton className="h-4 w-1/3 bg-muted rounded" />
            <Skeleton className="h-6 w-16 bg-muted rounded-full" />
          </div>
        </Card>
      ))}
    </ul>
  );

  return (
    <>
      {loading ? (
        renderSkeleton()
      ) : (
        <Motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl list-none pb-10"
        >
          {projects?.length > 0 &&
            projects.map((project: any) => (
              <Motion.li key={project._id} variants={item}>
                <CardProject project={project} variant="owner" />
              </Motion.li>
            ))}
        </Motion.ul>
      )}
    </>
  );
};

export default RecentProjectPage;
