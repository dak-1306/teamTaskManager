// @ts-nocheck
import React, { useRef, useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import Filter from "../../../components/common/Filter";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

import useProjectStore from "../stores/projectStore";
import { useUsersForAddMember } from "@/features/auth/queries/useUsersForAddMember";

import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

function AddMember({ isOpen, onClose, projectId }: Props) {
  const [memberEmail, setMemberEmail] = useState("");

  const { addMemberProject } = useProjectStore();

  const {
    data: usersForAddMember,
    isLoading: isUsersForAddMemberLoading,
    error,
  } = useUsersForAddMember(projectId);

  const [errorField, setErrorField] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load users. Please try again later.");
    }
  }, [error]);

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
  if (isUsersForAddMemberLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }
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
