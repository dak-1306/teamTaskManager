import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { useRef, useState } from "react";

import useTaskStore from "../stores/taskStore";

function EditTask({ open, onClose, taskDetail, assignedEmailEdit, setAssignedEmailEdit }) {
  const { updateTask } = useTaskStore();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const statusRef = useRef();
  const priorityRef = useRef();

  const [errorField, setErrorField] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    const origDue = taskDetail?.dueDate ? taskDetail.dueDate.split("T")[0] : "";
    const newDueInput = dueDateRef.current?.value ?? origDue;
    const newDueISO =
      newDueInput === origDue
        ? taskDetail.dueDate
        : new Date(newDueInput).toISOString();

    const updatedTask = {
      title: titleRef.current.value || taskDetail.title,
      description: descriptionRef.current.value || taskDetail.description,
      dueDate: newDueISO,
      status: statusRef.current.value || taskDetail.status,
      priority: priorityRef.current.value || taskDetail.priority,
      assignedTo: assignedEmailEdit,
    };

    if (
      updatedTask.title === taskDetail.title &&
      updatedTask.description === taskDetail.description &&
      updatedTask.dueDate === taskDetail.dueDate &&
      updatedTask.status === taskDetail.status &&
      updatedTask.priority === taskDetail.priority &&
      assignedEmailEdit.length === taskDetail.assignedTo.length
    ) {
      setErrorField("noChanges");
      return;
    }

    updateTask(taskDetail._id, updatedTask);
    onClose();
  };

  const handleCancel = () => {
    setAssignedEmailEdit(taskDetail?.assignedTo?.map((u) => u.email) ?? []);
    onClose();
  };

  console.log("edit task opened");
  console.log("Assigned Emails for Edit:", assignedEmailEdit);
  console.log("Task Detail in EditTask:", taskDetail);

  return (
    <Modal isOpen={open} onClose={handleCancel} title="Edit Task">
      <form className="space-y-4" onSubmit={handleSave}>
        <Input
          id="taskTitle"
          label="Task Name"
          placeHolder={taskDetail ? taskDetail.title : "Enter task name"}
          ref={titleRef}
          defaultValue={taskDetail ? taskDetail.title : ""}
        />
        <Input
          id="taskDescription"
          label="Description"
          placeHolder={
            taskDetail ? taskDetail.description : "Enter task description"
          }
          ref={descriptionRef}
          defaultValue={taskDetail ? taskDetail.description : ""}
        />
        <Input
          id="taskDueDate"
          label="Due Date"
          type="date"
          ref={dueDateRef}
          defaultValue={taskDetail ? taskDetail.dueDate.split("T")[0] : ""}
        />
        <select
          id="taskStatus"
          className="w-full p-2 border rounded text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-500 focus:outline-none focus:shadow-outline"
          ref={statusRef}
          defaultValue={taskDetail ? taskDetail.status : ""}
        >
          <option value="">Select Status</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <select
          id="taskPriority"
          className="w-full p-2 border rounded text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-500 focus:outline-none focus:shadow-outline"
          ref={priorityRef}
          defaultValue={taskDetail ? taskDetail.priority : ""}
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <p className="font-semibold text-gray-700 dark:text-white">
          Assigned Users:
        </p>
        {assignedEmailEdit.length > 0
          ? assignedEmailEdit.map((email) => (
              <Input
                key={email}
                id={`assignedUser-${email}`}
                placeHolder={email}
                defaultValue={email}
              >
                <Button
                  variant="danger"
                  onClick={() =>
                    setAssignedEmailEdit(
                      assignedEmailEdit.filter((item) => item !== email),
                    )
                  }
                >
                  Remove
                </Button>
              </Input>
            ))
          : null}
        {errorField === "noChanges" && (
          <p className="text-red-500 text-sm">No changes to update.</p>
        )}
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default EditTask;
