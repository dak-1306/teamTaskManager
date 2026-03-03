import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { useRef } from "react";

import useProjectStore from "../stores/projectStore";

function EditProject({ isOpen, onClose, project }) {
  const { updateProject } = useProjectStore();

  const nameRef = useRef();
  const descriptionRef = useRef();

  console.log("EditProject component received project:", project);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold">Edit Project</h1>
      <form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Input
          id="projectName"
          label="Project Name"
          placeHolder={project.name}
          ref={nameRef}
        />
        <Input
          id="projectDescription"
          label="Project Description"
          placeHolder={project.description}
          ref={descriptionRef}
        />
        <div className="flex space-x-4">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              const name = nameRef.current.value || project.name;
              const description = descriptionRef.current.value || project.description;
              console.log("Updating project with name:", name, "and description:", description);
              updateProject(project._id, { name, description });
              onClose();
            }}
          >
            Save Changes
          </Button>
          <Button variant="secondary" size="medium" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default EditProject;
