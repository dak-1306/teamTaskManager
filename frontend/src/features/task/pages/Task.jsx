import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { FilePlus } from "lucide-react";

import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import SearchBar from "../../../shared/ui/SearchBar";
import Filter from "../../../shared/ui/Filter";

import AddTask from "../components/AddTask";

import useTaskStore from "../stores/taskStore";

import formatDate from "../../../shared/utils/formatDate";

function Task({ projectId, variant, projectName }) {
  const navigate = useNavigate();

  const [openAddTask, setOpenAddTask] = useState(false);
  const [taskSearch, setTaskSearch] = useState("");
  const [filterTask, setFilterTask] = useState({
    status: "",
    priority: "",
    date: "",
  });

  const { tasks, fetchTasksByProjectId, filterTasks, loading } = useTaskStore();

  useEffect(() => {
    filterTasks({ ...filterTask, projectId });
  }, [filterTask, filterTasks, projectId]);

  useEffect(() => {
    fetchTasksByProjectId(projectId);
  }, [fetchTasksByProjectId, projectId]);

  const handleOnChangeTaskSearch = (e) => {
    setTaskSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    navigate(
      `/projects/${projectId}/${variant}/tasks/search?query=${encodeURIComponent(taskSearch)}`,
    );
  };

  const handleFilterChange = ({ name, value }) => {
    setFilterTask((prev) => ({ ...prev, [name]: value }));
  };

  const statusColors = {
    done: "text-green-500",
    doing: "text-yellow-500",
    todo: "text-red-500",
  };

  const priorityColors = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-green-500",
  };

  const filterStatus = [
    { value: "todo", label: "To Do" },
    { value: "doing", label: "Doing" },
    { value: "done", label: "Done" },
  ];
  const filterPriority = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];
  const filterTime = [
    { value: "dueDateAsc", label: "Due Date (Asc)" },
    { value: "dueDateDesc", label: "Due Date (Desc)" },
  ];

  console.log("loading:", loading);
  console.log("Tasks for project", projectId, tasks);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
        Task of Project {projectName}
      </h1>
      <Card>
        <div className="flex items-center justify-start space-x-2">
          <SearchBar
            placeholder="Search tasks..."
            value={taskSearch}
            onSubmit={handleSubmit}
            onChange={handleOnChangeTaskSearch}
          />
          <Filter
            name="status"
            options={filterStatus}
            value={filterTask.status}
            onFilterChange={(e) =>
              handleFilterChange({ name: "status", value: e.target.value })
            }
          />
          <Filter
            name="priority"
            options={filterPriority}
            value={filterTask.priority}
            onFilterChange={(e) =>
              handleFilterChange({ name: "priority", value: e.target.value })
            }
          />
          <Filter
            name="time"
            options={filterTime}
            value={filterTask.date}
            onFilterChange={(e) =>
              handleFilterChange({ name: "date", value: e.target.value })
            }
          />
          <Button
            variant="primary"
            size="medium"
            icon={<FilePlus className="w-4 h-4 mr-2" />}
            onClick={() => setOpenAddTask(true)}
          >
            Add Task
          </Button>
        </div>
      </Card>

      {tasks && tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((t) => (
            <Card key={t._id} animation={true} className="space-y-2 mb-4">
              <h2 className="text-xl font-semibold text-center">{t.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t.description}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Due Date: {t.dueDate ? formatDate(t.dueDate) : "No due date"}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Status:{" "}
                <span
                  className={
                    statusColors[t.status] || "text-gray-600 dark:text-gray-300"
                  }
                >
                  {t.status}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Priority:{" "}
                <span
                  className={
                    priorityColors[t.priority] ||
                    "text-gray-600 dark:text-gray-300"
                  }
                >
                  {t.priority}
                </span>
              </p>
              <div className="space-y-1">
                <h3 className="font-semibold">Assignees:</h3>
                <ul className="list-none">
                  {t.assignedTo.map((assignee) => (
                    <li key={assignee._id}>
                      <p className="text-gray-600 dark:text-gray-300">
                        {assignee.username} ({assignee.email})
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to={`/projects/${projectId}/${variant}/tasks/${t._id}`}>
                <Button variant="outline" size="small">
                  View Details
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">
          No tasks found for this project.
        </p>
      )}
      {/* modal add task */}
      {openAddTask && (
        <AddTask
          open={openAddTask}
          onClose={() => setOpenAddTask(false)}
          projectId={projectId}
        />
      )}
    </div>
  );
}
export default Task;
