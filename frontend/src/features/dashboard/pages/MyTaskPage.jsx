import MyTaskCard from "../components/MyTaskCard";

import { useEffect } from "react";

import useTaskStore from "../../task/stores/taskStore";

function MyTaskPage() {
  const { tasks, fetchTasks } = useTaskStore();
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  console.log("Tasks in MyTaskPage:", tasks);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-7xl">
      <ul className="list-none">
        {tasks ? (
          tasks.map((task) => (
            <li key={task.id}>
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
    </div>
  );
}

export default MyTaskPage;
