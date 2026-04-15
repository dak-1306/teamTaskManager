import React from "react";
import { motion as Motion } from "framer-motion";

import CardProject from "../../../components/common/CardProject";
import { container, item, inViewOptions } from "../../../app/motionConfig";

type Props = {
  projects: any[];
  loading: boolean;
};

const RecentProjectPage: React.FC<Props> = ({ projects, loading }) => {
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
        projects.map((project: any) => (
          <Motion.li key={project._id} variants={item}>
            <CardProject project={project} variant="owner" />
          </Motion.li>
        ))}
    </Motion.ul>
  );
};

export default RecentProjectPage;
