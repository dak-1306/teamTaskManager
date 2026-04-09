// @ts-nocheck
import React, { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

import useProjectStore from "../stores/projectStore";
import { useAuth } from "../../auth/context/useAuth";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

function AddMember({ isOpen, onClose, projectId }: Props) {
  const memberEmailRef = useRef<HTMLSelectElement | null>(null);

  const { addMemberProject } = useProjectStore();

  const { usersForAddMember } = useAuth();
  console.log(
    "Users for add member project in AddMember component:",
    usersForAddMember,
  );

  const [errorField, setErrorField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const memberEmail = memberEmailRef.current?.value;
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
        <form
          className="w-full max-w-sm bg-white dark:bg-gray-700 dark:shadow-md rounded p-6 mt-4"
          onSubmit={handleSubmit}
        >
          <select
            id="memberEmail"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-500 focus:outline-none focus:shadow-outline mb-4"
            ref={memberEmailRef}
          >
            <option value="">Select a member</option>
            {usersForAddMember && usersForAddMember.length > 0 ? (
              usersForAddMember.map((user) => (
                <option key={user._id} value={user.email}>
                  {user.username} ({user.email})
                </option>
              ))
            ) : (
              <option value="" disabled>
                No users available
              </option>
            )}
          </select>
          {errorField && <p className="text-red-500 text-sm">{errorField}</p>}
          <div className="flex space-x-4 justify-center ">
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
