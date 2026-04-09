// @ts-nocheck
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import Filter from "../../../components/common/Filter";
import { useEffect, useState } from "react";

import useTaskStore from "../stores/taskStore";
import useProjectStore from "../../project/stores/projectStore";
type AddTaskProps = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
};
function AddTask({ isOpen, onClose, projectId }: AddTaskProps) {
  const { createTask } = useTaskStore();
  const { projectDetail, fetchProjectById } = useProjectStore();
  useEffect(() => {
    if (projectId) {
      fetchProjectById(projectId);
    }
  }, [projectId, fetchProjectById]);

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

  return (
    <Dialog open={isOpen} onOpenChange={(openState) => !openState && onClose()}>
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
            onChange={(e) => setStatus(e.target.value)}
            options={taskStatus}
          ></Filter>

          <Filter
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={taskPriority}
          ></Filter>

          {/* {projectDetail && projectDetail.members && (
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
                value={emailAssignTo}
                onChange={(e) => setEmailAssignTo(e.target.value)}
              >
                <option value="">Select a member</option>
                {projectDetail.members.map((member) => (
                  <option key={member._id} value={member.email}>
                    {member.username} ({member.email})
                  </option>
                ))}
              </select>
            </div>
          )} */}
          <Filter
            name="assignTo"
            value={emailAssignTo}
            onChange={(e) => setEmailAssignTo(e.target.value)}
            options={
              projectDetail?.members?.map((member) => ({
                value: member.email,
                label: `${member.username} (${member.email})`,
              })) || []
            }
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
