// @ts-nocheck
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import Filter from "../../../components/common/Filter";
import { Button } from "../../../components/ui/button";

import { useState, useEffect } from "react";

import useTaskStore from "../stores/taskStore";
import useProjectStore from "../../project/stores/projectStore";

function AddAssignees({ isOpen, onClose, taskId, projectId }) {
  const [memberEmail, setMemberEmail] = useState("");
  const { addAssignees } = useTaskStore();

  const { projectDetail, fetchProjectById } = useProjectStore();

  useEffect(() => {
    if (projectId) {
      fetchProjectById(projectId);
    }
  }, [projectId, fetchProjectById]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberEmail) {
      addAssignees(taskId, memberEmail);
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>Add Assignees</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Filter
            name="email"
            options={
              projectDetail?.members?.map((member) => ({
                value: member.email,
                label: `${member.username} (${member.email})`,
              })) || []
            }
            value={memberEmail}
            onFilterChange={setMemberEmail}
          />
          <div className="flex space-x-4 mt-4">
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
