import {
  useSearchParams,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { useEffect } from "react";

import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

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
    searchTasks(query, projectId);
  }, [searchParams, projectId, searchTasks]);

  return (
    <MainLayout>
      <div className="space-y-4">
        <h1>Task Search</h1>
        {/* Add your search functionality here */}
        <p>Search query: {searchParams.get("query")}</p>
        <Button variant="outline" size="small" onClick={() => navigate(-1)}>
          Back to Projects Detail
        </Button>
        <div className="space-y-2">
          {loading ? (
            <p>Loading tasks...</p>
          ) : taskSearchResults.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            taskSearchResults.map((task) => (
              <Card>
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
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default TaskSearchPage;
