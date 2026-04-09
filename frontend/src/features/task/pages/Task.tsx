// @ts-nocheck
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { FilePlus, Funnel, Calendar, Tag } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { container, item, inViewOptions } from "../../../app/motionConfig";

import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import SearchBar from "../../../components/common/Search";
import Filter from "../../../components/common/Filter";
import Pagination from "../../../components/common/Pagination";
import CardTask from "../components/CardTask";
import SkeletonTask from "./SkeletonTask";

import AddTask from "../components/AddTask";
import FilterModal from "../components/FilterModal";

import useTaskStore from "../stores/taskStore";

import formatDate from "../../../components/utils/formatDate";

function Task({ projectId, variant }) {
  const navigate = useNavigate();

  const [openAddTask, setOpenAddTask] = useState(false);
  const [taskSearch, setTaskSearch] = useState("");
  const [filterTask, setFilterTask] = useState({
    status: "",
    priority: "",
    date: "",
  });
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const { tasks, fetchTasksByProjectId, filterTasks, loading } = useTaskStore();

  useEffect(() => {
    filterTasks({ ...filterTask, projectId });
  }, [filterTask, filterTasks, projectId]);

  useEffect(() => {
    fetchTasksByProjectId(projectId, tasks.page, tasks.limit); // Fetch first 100 tasks for the project
  }, [fetchTasksByProjectId, projectId, tasks.page, tasks.limit]);

  const handleOnChangeTaskSearch = (e) => {
    setTaskSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    navigate(
      `/projects/${projectId}/${variant}/tasks/search?query=${encodeURIComponent(taskSearch)}&page=${tasks.page}&limit=${tasks.limit}`,
    );
  };

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

  console.log("Tasks for project", projectId, tasks);
  if (loading) return <SkeletonTask />;

  return (
    <div className="space-y-4">
      <Card className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
        <Motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="flex flex-wrap items-center justify-start gap-2"
        >
          <div className="flex-1 min-w-[220px]">
            <SearchBar
              placeholder="Search tasks..."
              value={taskSearch}
              onSubmit={handleSubmit}
              onChange={handleOnChangeTaskSearch}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Funnel className="w-4 h-4 mr-2" />}
              onClick={() => setOpenFilterModal(true)}
              aria-label="Open filters"
            >
              Filter
            </Button>
            <Button
              variant="default"
              size="sm"
              icon={<FilePlus className="w-4 h-4 mr-2" />}
              onClick={() => setOpenAddTask(true)}
              aria-label="Add task"
            >
              Add Task
            </Button>
          </div>
        </Motion.div>
      </Card>
      {!loading && tasks.tasks && tasks.tasks.length > 0 ? (
        <Motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.tasks.map((t) => (
              <Motion.div key={t._id} variants={item} className="mb-4">
                {/* <Card animation={true} className="space-y-3 p-4">
                  <div className="flex flex-col items-start justify-between gap-2">
                    <h2 className="text-lg font-semibold">{t.title}</h2>
                    <div className="flex justify-between items-center gap-1">
                      <span
                        className={statusBadge[t.status] || statusBadge.todo}
                      >
                        {t.status}
                      </span>
                      <span
                        className={
                          priorityBadge[t.priority] || priorityBadge.low
                        }
                      >
                        {t.priority}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-col justify-start space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                      <span>
                        {t.dueDate ? formatDate(t.dueDate) : "No due date"}
                      </span>
                    </div>
                    <Link
                      to={`/projects/${projectId}/${variant}/tasks/${t._id}`}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        aria-label={`View ${t.title}`}
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </Card> */}
                <CardTask task={t} projectId={projectId} variant={variant} />
              </Motion.div>
            ))}
          </div>
          <Pagination
            currentPage={tasks.page}
            totalPages={Math.ceil(tasks.total / tasks.limit)}
            onPageChange={(page) =>
              fetchTasksByProjectId(projectId, page, tasks.limit)
            }
          />
        </Motion.div>
      ) : (
        <p className="text-gray-600 text-center">
          No tasks found for this project.
        </p>
      )}
      {openAddTask && (
        <AddTask
          isOpen={openAddTask}
          onClose={() => setOpenAddTask(false)}
          projectId={projectId}
        />
      )}
      {openFilterModal && (
        <FilterModal
          isOpen={openFilterModal}
          onClose={() => setOpenFilterModal(false)}
          initialFilters={filterTask}
          onApply={(f) => setFilterTask(f)}
        />
      )}
    </div>
  );
}
export default Task;
