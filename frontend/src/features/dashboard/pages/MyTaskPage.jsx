import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";

import MyTaskCard from "../components/MyTaskCard";
import SkeletonMyTask from "./SkeletonMyTask";
import Pagination from "../../../shared/ui/Pagination";

import useTaskStore from "../../task/stores/taskStore";
import { container, item } from "../../../app/motionConfig";

function MyTaskPage() {
  const { tasks, fetchTasks, loading } = useTaskStore();

  useEffect(() => {
    fetchTasks(tasks.page, tasks.limit);
  }, [fetchTasks, tasks.page, tasks.limit]);

  console.log("Tasks in MyTaskPage:", tasks);
  console.log("Page in MyTaskPage:", tasks.page);
  console.log("Limit in MyTaskPage:", tasks.limit);

  if (loading) {
    return <SkeletonMyTask />;
  }

  return (
    <div>
      <Motion.ul
        variants={container}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl list-none"
      >
        {!loading && tasks?.tasks?.length > 0 ? (
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
          ))
        ) : (
          <SkeletonMyTask />
        )}
      </Motion.ul>
      <Pagination
        currentPage={tasks?.page || 1}
        totalPages={Math.ceil((tasks?.total || 0) / (tasks?.limit || 1))}
        onPageChange={(page) => {
          console.log("Page changed to:", page);
          fetchTasks(page, tasks.limit);
        }}
      />
    </div>
  );
}

export default MyTaskPage;
