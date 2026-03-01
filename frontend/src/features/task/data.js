const TaskData = [
  {
    id: 1,
    name: "Design Homepage",
    description: "Create a modern and responsive homepage design.",
    dueDate: "2024-07-15",
    status: "todo",
    priority: "high",
    projectId: 1,
    assignees: [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
      },
    ],
  },
  {
    id: 2,
    name: "Implement Authentication",
    description: "Set up user authentication using JWT.",
    dueDate: "2024-07-20",
    status: "doing",
    priority: "medium",
    projectId: 2,
    assignees: [
      {
        id: 3,
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
      },
    ],
  },
  {
    id: 3,
    name: "Write Unit Tests",
    description: "Write unit tests for the user service.",
    dueDate: "2024-07-25",
    status: "done",
    priority: "low",
    projectId: 1,
    assignees: [
      {
        id: 4,
        name: "David Lee",
        email: "david.lee@example.com",
      },
    ],
  },
];
export default TaskData;
