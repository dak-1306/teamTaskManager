// @ts-nocheck
import React, { useState } from "react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";

import useProjectStore from "../stores/projectStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function CreateProject({ isOpen, onClose }: Props) {
  const { createProject, error } = useProjectStore();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [errorField, setErrorField] = useState<string | null>(null);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      name: projectName,
      description: projectDescription,
    };

    if (!newProject.name) {
      setErrorField("projectName");
      return;
    }
    if (!newProject.description) {
      setErrorField("projectDescription");
      return;
    }

    createProject(newProject);
    console.log("Project created:", newProject);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>Create New Project</DialogTitle>
        <form
          className="w-full max-w-sm bg-white dark:bg-gray-700 shadow-lg rounded p-6 mt-4"
          onSubmit={handleCreateProject}
        >
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
            >
              Project Name
            </label>
            <Input
              id="projectName"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName((e as any).target.value)}
            />
            {errorField === "projectName" && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="projectDescription"
              className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
            >
              Project Description
            </label>
            <Input
              id="projectDescription"
              placeholder="Enter project description"
              value={projectDescription}
              onChange={(e) => setProjectDescription((e as any).target.value)}
            />
            {errorField === "projectDescription" && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex space-x-4 justify-center">
            <Button type="submit" variant="default" size="default">
              Create Project
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

export default CreateProject;
