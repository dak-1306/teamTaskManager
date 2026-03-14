import { useEffect } from "react";

import MyTaskCard from "../components/MyTaskCard";
import Pagination from "../../../shared/ui/Pagination";

import useTaskStore from "../../task/stores/taskStore";

function MyTaskPage() {
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks(tasks.page, tasks.limit);
  }, [fetchTasks, tasks.page, tasks.limit]);

  console.log("Tasks in MyTaskPage:", tasks);
  console.log("Page in MyTaskPage:", tasks.page);
  console.log("Limit in MyTaskPage:", tasks.limit);

  return (
    <div>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl list-none">
        {tasks ? (
          tasks.tasks.map((task) => (
            <li key={task._id}>
              <MyTaskCard
                title={task.title}
                description={task.description}
                status={task.status}
              />
            </li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
      <Pagination
        currentPage={tasks.page}
        totalPages={Math.ceil(tasks.total / tasks.limit)}
        onPageChange={(page) => {
          console.log("Page changed to:", page);
          fetchTasks(page, tasks.limit);
        }}
      />
    </div>
  );
}

export default MyTaskPage;
