import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import Modal from "../../../shared/ui/Modal";

import { useRef, useState } from "react";

import useProjectStore from "../stores/projectStore";

function CreateProject({ isOpen, onClose }) {
  const projectNameRef = useRef(null);
  const projectDescriptionRef = useRef(null);
  const [errorField, setErrorField] = useState(null);

  const { createProject, error } = useProjectStore();

  const handleCreateProject = (e) => {
    e.preventDefault();
    const newProject = {
      name: projectNameRef.current.value,
      description: projectDescriptionRef.current.value,
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
  const field = [
    {
      id: "projectName",
      label: "Project Name",
      placeHolder: "Enter project name",
      ref: projectNameRef,
    },
    {
      id: "projectDescription",
      label: "Project Description",
      placeHolder: "Enter project description",
      ref: projectDescriptionRef,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Create Project Page
      </h1>
      <form
        className="w-full max-w-sm bg-white shadow-md rounded p-6 mt-4"
        onSubmit={handleCreateProject}
      >
        {field.map((input) => (
          <div key={input.id} className="mb-4">
            <Input
              id={input.id}
              label={input.label}
              placeHolder={input.placeHolder}
              ref={input.ref}
            />
            {errorField === input.id && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
        ))}
        {error && <p className="text-red-500 text-sm">{error}</p>}
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
