import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

import MyTaskCard from "../components/MyTaskCard";
import Pagination from "../../../components/common/Pagination";
import { container, item, inViewOptions } from "../../../app/motionConfig";
import formatDate from "../../../components/utils/formatDate";

type Props = {
  tasks: any;
  loading: boolean;
  fetchTasks: (page: number, limit: number) => void;
};

const MyTaskPage: React.FC<Props> = ({ tasks, loading, fetchTasks }) => {
  return (
    <div>
      <Motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={inViewOptions}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl list-none"
      >
        {!loading &&
          tasks?.tasks?.length > 0 &&
          tasks.tasks.map((task: any) => (
            <Motion.li key={task._id} variants={item}>
              <Link to={`tasks/${task._id}`}>
                <MyTaskCard
                  title={task.title}
                  dueDate={formatDate(task.dueDate)}
                  status={task.status}
                />
              </Link>
            </Motion.li>
          ))}
      </Motion.ul>
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
