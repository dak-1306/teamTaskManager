import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import { useRef, useEffect, useState } from "react";

import useTaskStore from "../stores/taskStore";
import useProjectStore from "../../project/stores/projectStore";

function AddTask({ open, onClose, projectId }) {
  const { createTask } = useTaskStore();
  const { projectDetail, fetchProjectById } = useProjectStore();
  useEffect(() => {
    if (projectId) {
      fetchProjectById(projectId);
    }
  }, [projectId, fetchProjectById]);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const statusRef = useRef();
  const priorityRef = useRef();

  const emailAssignToRef = useRef();

  const [errorField, setErrorField] = useState(null);

  const handleAddTask = () => {
    const taskData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dueDateRef.current.value,
      priority: priorityRef.current.value,
      status: statusRef.current.value,
      projectId: projectId,
      emailAssignTo: emailAssignToRef.current.value,
    };
    if (!taskData.title) {
      setErrorField("title");
      return;
    }
    if (!taskData.description) {
      setErrorField("description");
      return;
    }
    if (!taskData.dueDate) {
      setErrorField("dueDate");
      return;
    }

    console.log("Creating task with data:", taskData);
    createTask(taskData);
    onClose();
  };
  const field = [
    {
      id: "title",
      label: "Task Title",
      placeHolder: "Enter task title",
      ref: titleRef,
    },
    {
      id: "description",
      label: "Description",
      placeHolder: "Enter task description",
      ref: descriptionRef,
    },
    {
      id: "dueDate",
      label: "Due Date",
      type: "date",
      ref: dueDateRef,
    },
  ];

  return (
    <Modal isOpen={open} onClose={onClose} title="Add New Task">
      <div className="space-y-4">
        {field.map((input) => (
          <div>
            <Input
              key={input.id}
              id={input.id}
              label={input.label}
              placeHolder={input.placeHolder}
              type={input.type}
              ref={input.ref}
            />
            {errorField === input.id && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
        ))}

        <select
          id="taskStatus"
          name="status"
          className="w-full p-2 border rounded dark:text-white dark:bg-gray-700 dark:border-gray-500 focus:outline-none focus:shadow-outline"
          ref={statusRef}
        >
          <option value="">-- Select Status --</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <select
          name="priority"
          id="priority"
          className="w-full p-2 border rounded dark:text-white dark:bg-gray-700 dark:border-gray-500 focus:outline-none focus:shadow-outline"
          ref={priorityRef}
        >
          <option value="">-- Select Priority --</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {projectDetail && projectDetail.members && (
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="memberEmail"
            >
              Project Members:
            </label>
            <select
              id="memberEmail"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-700 dark:border-gray-500"
              ref={emailAssignToRef}
            >
              <option value="">Select a member</option>
              {projectDetail.members.map((member) => (
                <option key={member._id} value={member.email}>
                  {member.username} ({member.email})
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default AddTask;
