import { motion as Motion } from "framer-motion";

import RecentProjectCard from "../components/RecentProjectCard";
import { container, item, inViewOptions } from "../../../app/motionConfig";
import formatDate from "../../../shared/utils/formatDate";

function RecentProjectPage({ projects, loading }) {
  return (
    <Motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={inViewOptions}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl list-none"
    >
      {!loading &&
        projects?.length > 0 &&
        projects.map((project) => (
          <Motion.li key={project._id} variants={item}>
            <RecentProjectCard
              title={project.name}
              description={project.description}
              time={formatDate(project.updatedAt)}
              projectId={project._id}
            />
          </Motion.li>
        ))}
    </Motion.ul>
  );
}

export default RecentProjectPage;
