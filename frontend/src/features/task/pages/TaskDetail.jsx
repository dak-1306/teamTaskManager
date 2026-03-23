import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EditTask from "../components/EditTask";
import DeleteTask from "../components/DeleteTask";
import AddAssignees from "../components/AddAssignees";

import { ArrowBigLeft, Trash2, Pencil, UserRoundPlus } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { container, item, inViewOptions } from "../../../app/motionConfig";

import MainLayout from "../../../shared/layout/MainLayout";

import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";
import SkeletonTaskDetail from "./SkeletonTaskDetail";

import useTaskStore from "../stores/taskStore";

import formatDate from "../../../shared/utils/formatDate";

function TaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const taskDetail = useTaskStore((state) => state.taskDetail);
  const fetchTaskById = useTaskStore((state) => state.fetchTaskById);
  const loading = useTaskStore((state) => state.loading);

  const [assignedEmailEdit, setAssignedEmailEdit] = useState([]);
  const [taskDetailForEdit, setTaskDetailForEdit] = useState(null);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [openAddAssignees, setOpenAddAssignees] = useState(false);

  useEffect(() => {
    if (taskId) {
      fetchTaskById(taskId);
    }
  }, [taskId, fetchTaskById]);

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
  if (loading) {
    return (
      <MainLayout isLogin={true}>
        <SkeletonTaskDetail />
      </MainLayout>
    );
  }
  return (
    <MainLayout isLogin={true}>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        {taskDetail?.title || "Loading..."}
      </h1>
      <Card>
        <Motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="flex items-center justify-start space-x-2"
        >
          <Motion.div variants={item} className="flex items-center space-x-2">
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
              onClick={() => {
                setTaskDetailForEdit(taskDetail);
                setAssignedEmailEdit(
                  taskDetail?.assignedTo?.map((u) => u.email) ?? [],
                );
                setOpenEditTask(true);
              }}
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
          </Motion.div>
        </Motion.div>
      </Card>
      {!loading && taskDetail ? (
        <Motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
        >
          <Motion.div variants={item}>
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
          </Motion.div>
        </Motion.div>
      ) : (
        <p className="text-gray-500">Task not found.</p>
      )}

      {/* modals */}
      {openAddAssignees && (
        <AddAssignees
          isOpen={openAddAssignees}
          onClose={() => setOpenAddAssignees(false)}
          taskId={taskId}
          projectId={taskDetail ? taskDetail.project._id : null}
        />
      )}
      {openEditTask && (
        <EditTask
          open={openEditTask}
          onClose={() => setOpenEditTask(false)}
          taskDetail={taskDetailForEdit}
          assignedEmailEdit={assignedEmailEdit}
          setAssignedEmailEdit={setAssignedEmailEdit}
        />
      )}
      {openDeleteTask && (
        <DeleteTask
          open={openDeleteTask}
          onClose={() => setOpenDeleteTask(false)}
          taskId={taskId}
        />
      )}
    </MainLayout>
  );
}

export default TaskDetail;
