import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import Modal from "../../../shared/ui/Modal";

import { useRef } from "react";

import useProjectStore from "../stores/projectStore";

function CreateProject({ isOpen, onClose }) {
  const projectNameRef = useRef(null);
  const projectDescriptionRef = useRef(null);

  const { createProject } = useProjectStore();

  const handleCreateProject = () => {
    const newProject = {
      name: projectNameRef.current.value,
      description: projectDescriptionRef.current.value,
    };
    createProject(newProject);
    console.log("Project created:", newProject);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Create Project Page
      </h1>
      <form
        className="w-full max-w-sm bg-white shadow-md rounded p-6 mt-4"
        onSubmit={handleCreateProject}
      >
        <Input
          id="projectName"
          label="Project Name"
          placeHolder="Enter project name"
          ref={projectNameRef}
        />
        <Input
          id="projectDescription"
          label="Project Description"
          placeHolder="Enter project description"
          ref={projectDescriptionRef}
        />
        <div className="flex space-x-4 justify-center">
          <Button type="submit" variant="primary" size="medium">
            Create Project
          </Button>
          <Button variant="secondary" size="medium" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default CreateProject;
