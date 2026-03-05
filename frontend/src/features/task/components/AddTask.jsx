import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import { useRef } from "react";

import useTaskStore from "../stores/taskStore";

function AddTask({ open, onClose, projectId }) {
  const { createTask } = useTaskStore();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const statusRef = useRef();
  const priorityRef = useRef();

  const emailAssignToRef = useRef();

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
    console.log("Creating task with data:", taskData);
    createTask(taskData);
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Add New Task">
      <div className="space-y-4">
        <Input
          label="Task Title"
          placeholder="Enter task title"
          ref={titleRef}
        />
        <Input
          label="Description"
          placeholder="Enter task description"
          ref={descriptionRef}
        />
        <Input label="Due Date" type="date" ref={dueDateRef} />
        <Input label="Status" placeholder="Enter task status" ref={statusRef} />
        <Input
          label="Priority"
          placeholder="Enter task priority"
          ref={priorityRef}
        />
        <Input
          label="Assign To"
          placeholder="Enter assignee email"
          ref={emailAssignToRef}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
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
