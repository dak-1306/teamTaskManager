import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EditTask from "../components/EditTask";
import DeleteTask from "../components/DeleteTask";
import AddAssignees from "../components/AddAssignees";

import MainLayout from "../../../shared/layout/MainLayout";

import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";

import useTaskStore from "../stores/taskStore";

function TaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { taskDetail, fetchTaskById } = useTaskStore();
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [openAddAssignees, setOpenAddAssignees] = useState(false);

  useEffect(() => {
    fetchTaskById(taskId);
  }, [taskId, fetchTaskById]);
  console.log("Task Detail for Task ID:", taskId, taskDetail);
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Task Detail for Task ID: {taskId}
      </h1>
      <Button variant="outline" size="medium" onClick={() => navigate(-1)}>
        Back
      </Button>
      {taskDetail ? (
        <Card className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold">{taskDetail.title}</h2>
          <p className="text-gray-600">{taskDetail.description}</p>
          <p className="text-gray-500">Due Date: {taskDetail.dueDate}</p>
          <p className="text-gray-500">
            Status:{" "}
            <span
              className={
                taskDetail.status === "done"
                  ? "text-green-500"
                  : taskDetail.status === "doing"
                    ? "text-yellow-500"
                    : "text-red-500"
              }
            >
              {taskDetail.status}
            </span>
          </p>
          <p>
            Priority:{" "}
            <span
              className={
                taskDetail.priority === "high"
                  ? "text-red-500"
                  : taskDetail.priority === "medium"
                    ? "text-yellow-500"
                    : "text-green-500"
              }
            >
              {taskDetail.priority}
            </span>
          </p>
          <div className="mt-2">
            <h3 className="font-semibold">Assignees:</h3>
            <ul className="list-disc list-inside">
              {taskDetail.assignedTo.map((assignee) => (
                <li key={assignee._id}>
                  {assignee.username} ({assignee.email})
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ) : (
        <p className="text-gray-500">Task not found.</p>
      )}

      <div className="mt-4 flex space-x-2">
        <Button
          variant="primary"
          size="medium"
          onClick={() => setOpenAddAssignees(true)}
        >
          Add Assignees
        </Button>
        <Button
          variant="primary"
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
      {/* modals */}
      <AddAssignees
        isOpen={openAddAssignees}
        onClose={() => setOpenAddAssignees(false)}
        taskId={taskId}
      />
      <EditTask
        open={openEditTask}
        onClose={() => setOpenEditTask(false)}
        taskDetail={taskDetail}
      />
      <DeleteTask
        open={openDeleteTask}
        onClose={() => setOpenDeleteTask(false)}
        taskId={taskId}
      />
    </MainLayout>
  );
}

export default TaskDetail;
