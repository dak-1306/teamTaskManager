import { useState } from "react";
import TaskData from "../data"; // Importing task data for demonstration

import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

import EditTask from "../components/EditTask";
import DeleteTask from "../components/DeleteTask";

function Task({ id }) {
  const projectId = Number(id); // Assuming the task is related to a project
  const task = TaskData.filter((t) => t.projectId === projectId); // Find tasks by project ID
  console.log("Task data for project:", task);

  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Task of Project {projectId}
      </h1>
      {task && task.length > 0 ? (
        task.map((t) => (
          <Card key={t.id} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold">{t.name}</h2>
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
                {t.assignees.map((assignee) => (
                  <li key={assignee.id}>
                    {assignee.name} ({assignee.email})
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button
                variant="outline"
                size="small"
                onClick={() => setOpenEditTask(true)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => setOpenDeleteTask(true)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-gray-600 text-center">
          No tasks found for this project.
        </p>
      )}

      {/* modals */}
      <EditTask open={openEditTask} onClose={() => setOpenEditTask(false)} />
      <DeleteTask
        open={openDeleteTask}
        onClose={() => setOpenDeleteTask(false)}
      />
    </div>
  );
}
export default Task;
