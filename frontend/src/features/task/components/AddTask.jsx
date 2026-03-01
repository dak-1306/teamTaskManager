import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

function AddTask({ open, onClose }) {
  return (
    <Modal isOpen={open} onClose={onClose} title="Add New Task">
      <div className="space-y-4">
        <Input label="Task Name" placeholder="Enter task name" />
        <Input label="Description" placeholder="Enter task description" />
        <Input label="Due Date" type="date" />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => alert("Task added!")}>
            Add Task
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default AddTask;
