// @ts-nocheck
import React, { useState } from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

import useProjectStore from "../stores/projectStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

function EditProject({ isOpen, onClose, project }: Props) {
  const { updateProject } = useProjectStore();

  const [name, setName] = useState(project.name || "");
  const [description, setDescription] = useState(project.description || "");

  const [errorField, setErrorField] = useState<string | null>(null);
  const [members, setMembers] = useState(project.members || []);

  // Handle form submission to update the project
  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      name === project.name &&
      description === project.description &&
      members.length === project.members.length
    ) {
      setErrorField("noChanges");
      return;
    }

    updateProject(project._id, { name, description, members });
    onClose();
  };

  // Handle modal close to reset members state
  const handleOnClose = () => {
    setMembers(project.members || []);
    onClose();
  };

  // form fields state-driven
  const Field = [
    {
      id: "projectName",
      label: "Project Name",
      placeHolder: project.name || "Enter project name",
      value: name,
      onChange: (e: any) => setName(e.target.value),
    },
    {
      id: "projectDescription",
      label: "Project Description",
      placeHolder: project.description || "Enter project description",
      value: description,
      onChange: (e: any) => setDescription(e.target.value),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleOnClose()}>
      <DialogContent>
        <DialogTitle>Edit Project</DialogTitle>
        <form onSubmit={handleUpdateProject} className="space-y-4">
          {/* Input Fields */}
          {Field.map((input) => (
            <div key={input.id} className="mb-4">
              <label
                htmlFor={input.id}
                className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
              >
                {input.label}
              </label>
              <Input
                id={input.id}
                placeholder={input.placeHolder}
                value={input.value}
                onChange={input.onChange}
              />
            </div>
          ))}
          {/* Error Message */}
          {errorField === "noChanges" && (
            <p className="text-red-500 text-sm">No changes to update.</p>
          )}
          {/* Members List */}
          {project && members && (
            <div className=" space-y-2">
              <p className=" text-sm font-semibold">
                Members ({members.length}):
              </p>
              <ul className="list-disc list-inside space-y-1 max-h-48 overflow-y-auto">
                {members.map((member: any) => (
                  <li
                    key={member._id}
                    className="flex items-center justify-between p-2 rounded-md border "
                  >
                    <span>{`${member.username} (${member.email})`}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        setMembers(
                          members.filter((m: any) => m._id !== member._id),
                        )
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex space-x-4 justify-center">
            <Button type="submit" variant="default" size="default">
              Save Changes
            </Button>
            <Button variant="outline" size="default" onClick={handleOnClose}>
              Close
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default EditProject;
