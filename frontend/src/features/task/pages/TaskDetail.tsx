// @ts-nocheck
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EditTask from "../components/EditTask";
import Conversation from "../../chat/conversation/Conversation";
import DeleteTask from "../components/DeleteTask";
import AddAssignees from "../components/AddAssignees";

import {
  ArrowBigLeft,
  Trash2,
  Pencil,
  UserRoundPlus,
  Calendar,
  Users,
} from "lucide-react";
import { motion as Motion } from "framer-motion";
import { container, item, inViewOptions } from "../../../app/motionConfig";

import MainLayout from "../../../components/layout/MainLayout";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import Chat from "../../chat/Chat";

import useTaskStore from "../stores/taskStore";

import formatDate from "../../../components/utils/formatDate";

function TaskDetail() {
  const { taskId, variant } = useParams();
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
    if (taskId) fetchTaskById(taskId);
  }, [taskId, fetchTaskById]);

  const statusBadge = {
    done: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    doing:
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    todo: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const priorityBadge = {
    high: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200",
    medium:
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
    low: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200",
  };

  const renderSidebarSkeleton = () => (
    <Card className="p-6 space-y-4">
      <Skeleton className="h-6 w-3/4 rounded bg-muted" />
      <div className="flex gap-4">
        <Skeleton className="h-6 w-24 rounded bg-muted" />
        <Skeleton className="h-6 w-24 rounded bg-muted" />
        <Skeleton className="h-6 w-24 rounded bg-muted" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="h-6 w-32 rounded bg-muted" />
        <Skeleton className="h-8 w-16 rounded bg-muted" />
      </div>
      <div className="space-y-4 mt-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-muted" />
          <Skeleton className="h-6 w-1/2 rounded bg-muted" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-muted" />
          <Skeleton className="h-6 w-1/2 rounded bg-muted" />
        </div>
      </div>
    </Card>
  );

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
        {taskDetail?.title || "Loading..."}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="md:col-span-1 space-y-4">
          <Card className="flex items-center justify-start gap-2 p-4">
            <Motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={inViewOptions}
              className="flex items-center justify-between space-x-4 w-full"
            >
              <Motion.div
                variants={item}
                className="flex items-center space-x-2"
              >
                <Button
                  className="mr-6"
                  variant="outline"
                  size="default"
                  onClick={() => navigate(-1)}
                >
                  <ArrowBigLeft />
                </Button>
                <Button
                  variant="default"
                  size="default"
                  icon={<UserRoundPlus className="w-4 h-4 mr-2" />}
                  onClick={() => setOpenAddAssignees(true)}
                >
                  Add Assignees
                </Button>
                <Button
                  variant="default"
                  size="default"
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
                  variant="destructive"
                  size="default"
                  icon={<Trash2 className="w-4 h-4 mr-2" />}
                  onClick={() => setOpenDeleteTask(true)}
                >
                  Delete Task
                </Button>
              </Motion.div>
            </Motion.div>
          </Card>
          
          {loading ? (
            renderSidebarSkeleton()
          ) : taskDetail ? (
            <Motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={inViewOptions}
            >
              <Motion.div variants={item}>
                <Card className="p-6 space-y-4">
                  <p className="mb-3 text-gray-800 dark:text-gray-100">
                    <strong className="mr-2">Description:</strong>
                    {taskDetail?.description || "-"}
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                      <span>
                        {taskDetail?.dueDate
                          ? formatDate(taskDetail?.dueDate)
                          : "No due date"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Status:
                      </span>
                      <span
                        className={
                          statusBadge[taskDetail?.status] || statusBadge.todo
                        }
                      >
                        {taskDetail?.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Priority:
                      </span>
                      <span
                        className={
                          priorityBadge[taskDetail?.priority] ||
                          priorityBadge.low
                        }
                      >
                        {taskDetail?.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                      <strong className="text-sm text-gray-700 dark:text-gray-200">
                        Assignees
                      </strong>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({taskDetail?.assignedTo?.length || 0})
                      </span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setOpenAddAssignees(true)}
                    >
                      Add
                    </Button>
                  </div>
                  <ul className="space-y-2">
                    {taskDetail?.assignedTo &&
                      taskDetail.assignedTo.map((assignee) => (
                        <li
                          key={assignee._id}
                          className="flex items-center gap-3"
                        >
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-xs font-medium">
                            {assignee.username
                              ?.split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                          <div className="text-sm">
                            <div className="text-gray-800 dark:text-gray-100">
                              {assignee.username}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {assignee.email}
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </Card>
              </Motion.div>
            </Motion.div>
          ) : (
            <p className="text-gray-500">Task not found.</p>
          )}
        </div>
        <Card className="md:col-span-1 p-6 mb-10">
          <Motion.div
            className="space-y-4 flex flex-col"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={inViewOptions}
          >
            <Conversation
              projectId={undefined}
              taskId={taskId}
              variant={variant}
            />
            <hr className="my-3" />
            <Chat conversation={null} />
          </Motion.div>
        </Card>
      </div>
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
    </>
  );
}

export default TaskDetail;
