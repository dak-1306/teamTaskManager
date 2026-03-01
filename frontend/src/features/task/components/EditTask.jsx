import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

function EditTask({ open, onClose }) {
  return (
    <Modal isOpen={open} onClose={onClose} title="Edit Task">
      <div className="space-y-4">
        <Input label="Task Name" placeholder="Enter task name" />
        <Input label="Description" placeholder="Enter task description" />
        <Input label="Due Date" type="date" />
        <select className="w-full p-2 border rounded">
          <option value="">Select Status</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <select className="w-full p-2 border rounded">
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => alert("Task updated!")}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default EditTask;
