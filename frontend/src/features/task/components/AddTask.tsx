// @ts-nocheck
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import Filter from "../../../components/common/Filter";
import { useEffect, useState, useMemo } from "react";

import useTaskStore from "../stores/taskStore";
import useProjectStore from "../../project/stores/projectStore";
type AddTaskProps = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  memberOptions: { value: string; label: string }[];
};
function AddTask({ isOpen, onClose, projectId, memberOptions }: AddTaskProps) {
  const { createTask } = useTaskStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [emailAssignTo, setEmailAssignTo] = useState("");

  const [errorField, setErrorField] = useState(null);

  const handleAddTask = () => {
    const taskData = {
      title,
      description,
      dueDate,
      priority,
      status,
      projectId,
      emailAssignTo,
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

  const taskStatus = [
    {
      value: "todo",
      label: "To Do",
    },
    {
      value: "doing",
      label: "Doing",
    },
    {
      value: "done",
      label: "Done",
    },
  ];
  const taskPriority = [
    {
      value: "low",
      label: "Low",
    },
    {
      value: "medium",
      label: "Medium",
    },
    {
      value: "high",
      label: "High",
    },
  ];
  console.log("add task opened", isOpen);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogTitle>Add New Task</DialogTitle>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errorField === "title" && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Input
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errorField === "description" && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            {errorField === "dueDate" && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <Filter
            name="status"
            value={status}
            onFilterChange={setStatus}
            options={taskStatus}
          ></Filter>

          <Filter
            name="priority"
            value={priority}
            onFilterChange={setPriority}
            options={taskPriority}
          ></Filter>
          <Filter
            name="assignTo"
            value={emailAssignTo}
            onFilterChange={setEmailAssignTo}
            options={memberOptions}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleAddTask}>
              Add Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default AddTask;
