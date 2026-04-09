// @ts-nocheck
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

import { useRef, useEffect } from "react";

import useTaskStore from "../stores/taskStore";
import useProjectStore from "../../project/stores/projectStore";

function AddAssignees({ isOpen, onClose, taskId, projectId }) {
  const memberEmailRef = useRef();
  const { addAssignees } = useTaskStore();

  console.log("AddAssignees component received taskId:", taskId);
  console.log("AddAssignees component received projectId:", projectId);

  const { projectDetail, fetchProjectById } = useProjectStore();

  useEffect(() => {
    if (projectId) {
      fetchProjectById(projectId);
    }
  }, [projectId, fetchProjectById]);

  console.log("Project Detail in AddAssignees:", projectDetail);

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberEmail = memberEmailRef.current.value;
    if (memberEmail) {
      addAssignees(taskId, memberEmail);
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>Add Assignees</DialogTitle>
        <form
          className="w-full max-w-sm bg-white dark:bg-gray-700 dark:shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {projectDetail && projectDetail.members && (
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                htmlFor="memberEmail"
              >
                Project Members:
              </label>
              <select
                id="memberEmail"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-500 focus:outline-none focus:shadow-outline"
                ref={memberEmailRef}
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
          <div className="flex space-x-4">
            <Button type="submit" variant="default" size="default">
              Add Assignee
            </Button>
            <Button variant="outline" size="default" onClick={onClose}>
              Close
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default AddAssignees;
