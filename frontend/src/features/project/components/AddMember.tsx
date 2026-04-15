// @ts-nocheck
import React, { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import Filter from "../../../components/common/Filter";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

import useProjectStore from "../stores/projectStore";
import { useAuth } from "../../auth/context/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

function AddMember({ isOpen, onClose, projectId }: Props) {
  const [memberEmail, setMemberEmail] = useState("");

  const { addMemberProject } = useProjectStore();

  const { usersForAddMember } = useAuth();

  const [errorField, setErrorField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberEmail) {
      setErrorField("Email is required");
      return;
    }
    if (memberEmail) {
      addMemberProject(projectId, memberEmail);
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>Add Member to Project</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Filter
            name="email"
            options={usersForAddMember.map((user) => ({
              value: user.email,
              label: `${user.username} (${user.email})`,
            }))}
            value={memberEmail}
            onFilterChange={setMemberEmail}
          />

          {errorField && <p className="text-red-500 text-sm">{errorField}</p>}
          <div className="flex space-x-4 justify-center mt-4">
            <Button type="submit" variant="default" size="default">
              Add Member
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
export default AddMember;
