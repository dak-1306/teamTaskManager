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

  const taskDetail = useTaskStore((state) => state.taskDetail);
  const fetchTaskById = useTaskStore((state) => state.fetchTaskById);

  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [openAddAssignees, setOpenAddAssignees] = useState(false);

  useEffect(() => {
    fetchTaskById(taskId);
  }, [taskId, fetchTaskById]);

  console.log("Task Detail for Task ID:", taskId, taskDetail);
  return (
    <MainLayout>
      <div className="space-y-4 mt-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Task Detail: {taskDetail.title}
        </h1>
        <div className="mt-4 flex space-x-2">
          <Button
            className="mr-6"
            variant="secondary"
            size="medium"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
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
              <ul className="list-none">
                {taskDetail.assignedTo.map((assignee) => (
                  <li key={assignee._id}>
                    <p className="text-gray-600">
                      {assignee.username} ({assignee.email})
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ) : (
          <p className="text-gray-500">Task not found.</p>
        )}

        {/* modals */}
        <AddAssignees
          isOpen={openAddAssignees}
          onClose={() => setOpenAddAssignees(false)}
          taskId={taskId}
          projectId={taskDetail ? taskDetail.project._id : null}
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
      </div>
    </MainLayout>
  );
}

export default TaskDetail;
