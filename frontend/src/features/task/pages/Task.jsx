import { useEffect } from "react";

import { Link } from "react-router-dom";

import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

import useTaskStore from "../stores/taskStore";

function Task({ projectId, variant }) {
  const { tasks, fetchTasksByProjectId } = useTaskStore();
  useEffect(() => {
    fetchTasksByProjectId(projectId);
  }, [fetchTasksByProjectId, projectId]);

  console.log("Tasks for project", projectId, tasks);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Task of Project {projectId}
      </h1>
      {tasks && tasks.length > 0 ? (
        tasks.map((t) => (
          <Card key={t._id} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold">{t.title}</h2>
            <p className="text-gray-600">{t.description}</p>
            <p className="text-gray-500">Due Date: {t.dueDate}</p>
            <p className="text-gray-500">
              Status:{" "}
              <span
                className={
                  t.status === "done"
                    ? "text-green-500"
                    : t.status === "doing"
                      ? "text-yellow-500"
                      : "text-red-500"
                }
              >
                {t.status}
              </span>
            </p>
            <p>
              Priority:{" "}
              <span
                className={
                  t.priority === "high"
                    ? "text-red-500"
                    : t.priority === "medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                }
              >
                {t.priority}
              </span>
            </p>
            <div className="mt-2">
              <h3 className="font-semibold">Assignees:</h3>
              <ul className="list-disc list-inside">
                {t.assignedTo.map((assignee) => (
                  <li key={assignee._id}>
                    {assignee.username} ({assignee.email})
                  </li>
                ))}
              </ul>
            </div>
            <Link to={`/projects/${projectId}/${variant}/tasks/${t._id}`}>
              <Button variant="link" className="ml-4">
                View Details
              </Button>
            </Link>
          </Card>
        ))
      ) : (
        <p className="text-gray-600 text-center">
          No tasks found for this project.
        </p>
      )}
    </div>
  );
}
export default Task;
