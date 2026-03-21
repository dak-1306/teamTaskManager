import { useEffect } from "react";

import { motion as Motion } from "motion/react";

import RecentProjectCard from "../components/RecentProjectCard";
import SkeletonRecentProject from "./SkeletonRecentProject";

import useProjectStore from "../../project/stores/projectStore";
import { container, item } from "../../../app/motionConfig";

function RecentProjectPage() {
  const { projects, fetchProjectMe, loading } = useProjectStore();
  useEffect(() => {
    fetchProjectMe();
  }, [fetchProjectMe]);

  console.log("Projects in RecentProjectPage:", projects);

  if (loading) {
    return <SkeletonRecentProject />;
  }

  return (
    <Motion.ul
      variants={container}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl list-none"
    >
      {!loading && projects?.length > 0 ? (
        projects.map((project) => (
          <Motion.li key={project._id} variants={item}>
            <RecentProjectCard
              title={project.name}
              description={project.description}
              time={project.updatedAt}
              projectId={project._id}
            />
          </Motion.li>
        ))
      ) : (
        <SkeletonRecentProject />
      )}
    </Motion.ul>
  );
}

export default RecentProjectPage;
