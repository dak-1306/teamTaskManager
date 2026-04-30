// @ts-nocheck
import {
  useSearchParams,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { useEffect } from "react";

import { motion as Motion } from "framer-motion";
import { container, item, inViewOptions } from "../../../app/motionConfig";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";
import Pagination from "../../../components/common/Pagination";

import useTaskStore from "../stores/taskStore";

function TaskSearchPage() {
  const [searchParams] = useSearchParams();
  const { projectId } = useParams();
  const { variant } = useParams();
  const navigate = useNavigate();
  const searchTasks = useTaskStore((state) => state.searchTasks);
  const taskSearchResults = useTaskStore((state) => state.taskSearchResults);
  const loading = useTaskStore((state) => state.loading);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    searchTasks(
      query,
      projectId,
      taskSearchResults.page,
      taskSearchResults.limit,
    );
  }, [
    searchParams,
    projectId,
    taskSearchResults.page,
    taskSearchResults.limit,
    searchTasks,
  ]);

  const renderSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card key={idx} className="p-4 space-y-4">
          <Skeleton className="h-6 w-3/4 rounded bg-muted" />
          <Skeleton className="h-4 w-full rounded bg-muted" />
          <Skeleton className="h-4 w-1/2 rounded bg-muted" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-1/3 rounded bg-muted" />
            <Skeleton className="h-4 w-1/4 rounded bg-muted" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Skeleton className="h-8 w-24 rounded bg-muted" />
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Task Search</h1>
          <p className="text-sm text-gray-600 mt-1">
            Search query: <strong>{searchParams.get("query")}</strong>
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          Back to Projects Detail
        </Button>
      </div>

      {loading ? (
        renderSkeleton()
      ) : (
        <>
          <Motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={inViewOptions}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
          >
            {taskSearchResults.tasks &&
              taskSearchResults.tasks.length > 0 &&
              taskSearchResults.tasks.map((task) => (
                <Motion.div key={task._id} variants={item} className="mb-4">
                  <Card animation={true} className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{task.description}</p>
                    <p className="text-sm text-gray-500 mb-1">
                      Due Date:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No due date"}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">Status: {task.status}</p>
                    <p className="text-sm text-gray-500 mb-2">Priority: {task.priority}</p>
                    <div className="space-y-1 mb-4">
                      <h3 className="font-semibold text-sm">Assignees:</h3>
                      <ul className="list-none text-sm">
                        {task.assignedTo && task.assignedTo.length > 0 ? (
                          task.assignedTo.map((assignee) => (
                            <li key={assignee._id} className="text-gray-600 dark:text-gray-400">
                              {assignee.name} ({assignee.email})
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">No assignees</li>
                        )}
                      </ul>
                    </div>
                    <Link
                      to={`/projects/${task.project._id}/${variant}/tasks/${task._id}`}
                    >
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </Card>
                </Motion.div>
              ))}
          </Motion.div>
          <Pagination
            totalPages={Math.ceil(
              taskSearchResults.total / taskSearchResults.limit,
            )}
            currentPage={taskSearchResults.page}
            onPageChange={(page) => {
              const query = searchParams.get("query") || "";
              searchTasks(query, projectId, page, taskSearchResults.limit);
            }}
          />
        </>
      )}
    </div>
  );
}

export default TaskSearchPage;
