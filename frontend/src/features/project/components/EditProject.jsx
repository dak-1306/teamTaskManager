import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { useRef, useState } from "react";

import useProjectStore from "../stores/projectStore";

function EditProject({ isOpen, onClose, project }) {
  const { updateProject } = useProjectStore();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const [members, setMembers] = useState(project.members || []);

  const handleOnClose = () => {
    setMembers(project.members || []);
    onClose();
  };

  console.log("EditProject component received project:", project);

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <h1 className="text-3xl font-bold">Edit Project</h1>
      <form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Input
          id="projectName"
          label="Project Name"
          placeHolder={project.name || "Enter project name"}
          defaultValue={project.name}
          ref={nameRef}
        />
        <Input
          id="projectDescription"
          label="Project Description"
          placeHolder={project.description || "Enter project description"}
          defaultValue={project.description}
          ref={descriptionRef}
        />
        {project && members && (
          <div className="mb-4">
            <p className="text-gray-700 text-base">
              Members ({members.length}):
            </p>
            <ul className="list-disc list-inside">
              {members.map((member) => (
                <Input
                  key={member._id}
                  id={`member-${member._id}`}
                  placeHolder={`${member.username} (${member.email})`}
                  defaultValue={`${member.username} (${member.email})`}
                >
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => {
                      setMembers(members.filter((m) => m._id !== member._id));
                    }}
                  >
                    Remove
                  </Button>
                </Input>
              ))}
            </ul>
          </div>
        )}
        <div className="flex space-x-4">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              const name = nameRef.current.value || project.name;
              const description =
                descriptionRef.current.value || project.description;
              console.log(
                "Updating project with name:",
                name,
                "and description:",
                description,
                "and members:",
                members,
              );
              updateProject(project._id, { name, description, members });
              onClose();
            }}
          >
            Save Changes
          </Button>
          <Button variant="secondary" size="medium" onClick={handleOnClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default EditProject;
