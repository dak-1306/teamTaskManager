import { useEffect } from "react";

import { Link } from "react-router-dom";

import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

import useTaskStore from "../stores/taskStore";

import formatDate from "../../../shared/utils/formatDate";

function Task({ projectId, variant, projectName }) {
  const { tasks, fetchTasksByProjectId } = useTaskStore();
  useEffect(() => {
    fetchTasksByProjectId(projectId);
  }, [fetchTasksByProjectId, projectId]);

  console.log("Tasks for project", projectId, tasks);

  const statusColors = {
    done: "text-green-500",
    doing: "text-yellow-500",
    todo: "text-red-500",
  };

  const priorityColors = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-green-500",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Task of Project {projectName}
      </h1>
      {tasks && tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((t) => (
            <Card key={t._id} className="mb-4 space-y-2">
              <h2 className="text-xl font-semibold text-center">{t.title}</h2>
              <p className="text-gray-600">{t.description}</p>
              <p className="text-gray-600">
                Due Date: {t.dueDate ? formatDate(t.dueDate) : "No due date"}
              </p>
              <p className="text-gray-600">
                Status:{" "}
                <span className={statusColors[t.status] || "text-gray-600"}>
                  {t.status}
                </span>
              </p>
              <p className="text-gray-600">
                Priority:{" "}
                <span className={priorityColors[t.priority] || "text-gray-600"}>
                  {t.priority}
                </span>
              </p>
              <div className="space-y-1">
                <h3 className="font-semibold">Assignees:</h3>
                <ul className="list-none">
                  {t.assignedTo.map((assignee) => (
                    <li key={assignee._id}>
                      <p className="text-gray-600">
                        {assignee.username} ({assignee.email})
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to={`/projects/${projectId}/${variant}/tasks/${t._id}`}>
                <Button variant="outline" size="small">
                  View Details
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">
          No tasks found for this project.
        </p>
      )}
    </div>
  );
}
export default Task;
