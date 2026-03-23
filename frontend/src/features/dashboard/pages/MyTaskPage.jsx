import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

import MyTaskCard from "../components/MyTaskCard";
import Pagination from "../../../shared/ui/Pagination";
import { container, item, inViewOptions } from "../../../app/motionConfig";

function MyTaskPage({ tasks, loading, fetchTasks }) {
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
          tasks.tasks.map((task) => (
            <Motion.li key={task._id} variants={item}>
              <Link to={`tasks/${task._id}`}>
                <MyTaskCard
                  title={task.title}
                  description={task.description}
                  status={task.status}
                />
              </Link>
            </Motion.li>
          ))}
      </Motion.ul>
      <Pagination
        currentPage={tasks?.page || 1}
        totalPages={Math.ceil((tasks?.total || 0) / (tasks?.limit || 1))}
        onPageChange={(page) => {
          fetchTasks(page, tasks.limit);
        }}
      />
    </div>
  );
}

export default MyTaskPage;
