import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { useRef } from "react";

import useTaskStore from "../stores/taskStore";

function EditTask({ open, onClose, task }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const statusRef = useRef();
  const priorityRef = useRef();

  const { updateTask } = useTaskStore();

  const handleSave = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dueDateRef.current.value,
      status: statusRef.current.value,
      priority: priorityRef.current.value,
    };

    updateTask(task._id, updatedTask);
    onClose();
  };

  console.log("Editing Task:", task);
  return (
    <Modal isOpen={open} onClose={onClose} title="Edit Task">
      <form className="space-y-4" onSubmit={handleSave}>
        <Input
          id="taskTitle"
          label="Task Name"
          placeHolder={task ? task.title : "Enter task name"}
          ref={titleRef}
          defaultValue={task ? task.title : ""}
        />
        <Input
          id="taskDescription"
          label="Description"
          placeHolder={task ? task.description : "Enter task description"}
          ref={descriptionRef}
          defaultValue={task ? task.description : ""}
        />
        <Input
          id="taskDueDate"
          label="Due Date"
          type="date"
          ref={dueDateRef}
          defaultValue={task ? task.dueDate.split("T")[0] : ""}
        />
        <select
          id="taskStatus"
          className="w-full p-2 border rounded"
          ref={statusRef}
          defaultValue={task?.status}
        >
          <option value="">Select Status</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <select
          id="taskPriority"
          className="w-full p-2 border rounded"
          ref={priorityRef}
          defaultValue={task?.priority}
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
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
