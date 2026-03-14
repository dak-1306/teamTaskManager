import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EditTask from "../components/EditTask";
import DeleteTask from "../components/DeleteTask";
import AddAssignees from "../components/AddAssignees";

import { ArrowBigLeft, Trash2, Pencil, UserRoundPlus } from "lucide-react";

import MainLayout from "../../../shared/layout/MainLayout";

import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";

import useTaskStore from "../stores/taskStore";

import formatDate from "../../../shared/utils/formatDate";

function TaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const taskDetail = useTaskStore((state) => state.taskDetail);
  const fetchTaskById = useTaskStore((state) => state.fetchTaskById);
  console.log("taskDetail:", taskDetail);
  console.log("fetchTaskById:", fetchTaskById);
  console.log("taskId:", taskId);

  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [openAddAssignees, setOpenAddAssignees] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered");

    if (taskId) {
      console.log("calling fetchTaskById", taskId);
      fetchTaskById(taskId);
    }
  }, [taskId]);

  const statusColor = {
    done: "text-green-500",
    doing: "text-yellow-500",
    todo: "text-red-500",
  };

  const priorityColor = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-green-500",
  };

  return (
    <MainLayout isLogin={true}>
      <div className="space-y-4 mt-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {taskDetail?.title || "Loading..."}
        </h1>
        <Card>
          <div className="flex items-center justify-start space-x-2">
            <Button
              className="mr-6"
              variant="secondary"
              size="medium"
              onClick={() => navigate(-1)}
            >
              <ArrowBigLeft />
            </Button>
            <Button
              variant="primary"
              size="medium"
              icon={<UserRoundPlus className="w-4 h-4 mr-2" />}
              onClick={() => setOpenAddAssignees(true)}
            >
              Add Assignees
            </Button>
            <Button
              variant="primary"
              size="medium"
              icon={<Pencil className="w-4 h-4 mr-2" />}
              onClick={() => setOpenEditTask(true)}
            >
              Edit Task
            </Button>
            <Button
              variant="danger"
              size="medium"
              icon={<Trash2 className="w-4 h-4 mr-2" />}
              onClick={() => setOpenDeleteTask(true)}
            >
              Delete Task
            </Button>
          </div>
        </Card>
        {taskDetail ? (
          <Card className="bg-white p-4 rounded shadow mb-4">
            <p>
              <strong>Description:</strong> {taskDetail?.description}
            </p>
            <p>
              <strong>Due Date:</strong> {formatDate(taskDetail?.dueDate)}
            </p>
            <p className="flex items-center space-x-2">
              <strong>Status:</strong>
              <span
                className={statusColor[taskDetail?.status] || "text-gray-500"}
              >
                {taskDetail?.status}
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <strong>Priority:</strong>
              <span
                className={
                  priorityColor[taskDetail?.priority] || "text-gray-500"
                }
              >
                {taskDetail?.priority}
              </span>
            </p>
            <div className="mt-2">
              <strong>Assignees:</strong>
              <ul className="list-none">
                {taskDetail?.assignedTo &&
                  taskDetail.assignedTo.map((assignee) => (
                    <li key={assignee._id}>
                      <p>
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
