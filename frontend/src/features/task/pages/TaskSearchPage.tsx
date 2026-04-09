// @ts-nocheck
import {
  useSearchParams,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { useEffect } from "react";

import MainLayout from "../../../components/layout/MainLayout";
import { motion as Motion } from "framer-motion";
import { container, item, inViewOptions } from "../../../app/motionConfig";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import Pagination from "../../../components/common/Pagination";
import SkeletonTaskSearch from "./SkeletonTaskSearch";

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

  if (loading)
    return (
      <MainLayout>
        <SkeletonTaskSearch />
      </MainLayout>
    );

  return (
    <MainLayout>
      <h1>Task Search</h1>
      <p>Search query: {searchParams.get("query")}</p>
      <Button variant="outline" size="small" onClick={() => navigate(-1)}>
        Back to Projects Detail
      </Button>
      <Motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={inViewOptions}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
      >
        {!loading &&
          taskSearchResults.tasks &&
          taskSearchResults.tasks.length > 0 &&
          taskSearchResults.tasks.map((task) => (
            <Motion.div key={task._id} variants={item} className="mb-4">
              <Card animation={true}>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-gray-600">
                  Due Date:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </p>
                <p className="text-gray-600">Status: {task.status}</p>
                <p className="text-gray-600">Priority: {task.priority}</p>
                <div className="space-y-1">
                  <h3 className="font-semibold">Assignees:</h3>
                  <ul className="list-none">
                    {task.assignedTo && task.assignedTo.length > 0 ? (
                      task.assignedTo.map((assignee) => (
                        <li key={assignee._id} className="text-gray-600">
                          {assignee.name} ({assignee.email})
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-600">No assignees</li>
                    )}
                  </ul>
                </div>
                <Link
                  to={`/projects/${task.project._id}/${variant}/tasks/${task._id}`}
                >
                  <Button variant="outline" size="small">
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
    </MainLayout>
  );
}

export default TaskSearchPage;
