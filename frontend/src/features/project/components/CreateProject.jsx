import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import Modal from "../../../shared/ui/Modal";

import { useRef } from "react";

function CreateProject({ isOpen, onClose, setProjects, projects }) {
  const projectNameRef = useRef(null);
  const projectDescriptionRef = useRef(null);

  const handleCreateProject = () => {
    const newProject = {
      id: Date.now(),
      name: projectNameRef.current.value,
      description: projectDescriptionRef.current.value,
    };
    setProjects([...projects, newProject]);
    console.log("Project created:", newProject);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold">Create Project Page</h1>
      <form
        className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
        <div className="flex space-x-4">
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
