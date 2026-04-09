// @ts-nocheck
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

import { useState, useEffect } from "react";
import useTaskStore from "../stores/taskStore";

function EditTask({
  open,
  onClose,
  taskDetail,
  assignedEmailEdit,
  setAssignedEmailEdit,
}) {
  const { updateTask } = useTaskStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [errorField, setErrorField] = useState(null);

  useEffect(() => {
    if (taskDetail) {
      setTitle(taskDetail.title || "");
      setDescription(taskDetail.description || "");
      setDueDate(taskDetail.dueDate ? taskDetail.dueDate.split("T")[0] : "");
      setStatus(taskDetail.status || "");
      setPriority(taskDetail.priority || "");
      setAssignedEmailEdit(taskDetail?.assignedTo?.map((u) => u.email) ?? []);
    }
  }, [taskDetail, setAssignedEmailEdit]);

  const handleSave = (e) => {
    e.preventDefault();
    const origDue = taskDetail?.dueDate ? taskDetail.dueDate.split("T")[0] : "";
    const newDueInput = dueDate ?? origDue;
    const newDueISO =
      newDueInput === origDue
        ? taskDetail.dueDate
        : new Date(newDueInput).toISOString();

    const updatedTask = {
      title: title || taskDetail.title,
      description: description || taskDetail.description,
      dueDate: newDueISO,
      status: status || taskDetail.status,
      priority: priority || taskDetail.priority,
      assignedTo: assignedEmailEdit,
    };

    if (
      updatedTask.title === taskDetail.title &&
      updatedTask.description === taskDetail.description &&
      updatedTask.dueDate === taskDetail.dueDate &&
      updatedTask.status === taskDetail.status &&
      updatedTask.priority === taskDetail.priority &&
      assignedEmailEdit.length === (taskDetail.assignedTo?.length || 0)
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

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent>
        <DialogTitle>Edit Task</DialogTitle>
        <form className="space-y-4" onSubmit={handleSave}>
          <Input
            id="taskTitle"
            placeholder="Enter task name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            id="taskDescription"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            id="taskDueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            id="taskStatus"
            className="w-full p-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>

          <select
            id="taskPriority"
            className="w-full p-2 border rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <p className="font-semibold">Assigned Users</p>
          {assignedEmailEdit.length > 0
            ? assignedEmailEdit.map((email) => (
                <div
                  key={email}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <div className="text-sm">{email}</div>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      setAssignedEmailEdit(
                        assignedEmailEdit.filter((item) => item !== email),
                      )
                    }
                  >
                    Remove
                  </Button>
                </div>
              ))
            : null}

          {errorField === "noChanges" && (
            <p className="text-red-500 text-sm">No changes to update.</p>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="default" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditTask;
