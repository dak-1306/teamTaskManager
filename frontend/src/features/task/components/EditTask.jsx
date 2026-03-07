import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { useRef, useState, useEffect } from "react";

import useTaskStore from "../stores/taskStore";

function EditTask({ open, onClose, taskDetail }) {
  const { updateTask } = useTaskStore();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const statusRef = useRef();
  const priorityRef = useRef();
  const [assignedEmailEdit, setAssignedEmailEdit] = useState([]);

  useEffect(() => {
    const emails = taskDetail?.assignedTo?.map((u) => u.email) ?? [];
    setAssignedEmailEdit(emails);
  }, [taskDetail]);
  console.log("Assigned Emails for Edit:", assignedEmailEdit);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...taskDetail,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dueDateRef.current.value,
      status: statusRef.current.value,
      priority: priorityRef.current.value,
      assignedTo: assignedEmailEdit,
    };

    updateTask(taskDetail._id, updatedTask);
    onClose();
  };

  const handleCancel = () => {
    const initial = taskDetail?.assignedTo?.map((u) => u.email) ?? [];
    setAssignedEmailEdit(initial);
    onClose();
  };

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
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
          ref={priorityRef}
          defaultValue={taskDetail ? taskDetail.priority : ""}
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <p className="font-semibold ">Assigned Users:</p>
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
