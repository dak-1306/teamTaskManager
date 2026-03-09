import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { useRef, useState } from "react";

import useProjectStore from "../stores/projectStore";

function EditProject({ isOpen, onClose, project }) {
  const { updateProject } = useProjectStore();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const [errorField, setErrorField] = useState(null);
  const [members, setMembers] = useState(project.members || []);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const name = nameRef.current.value || project.name;
    const description = descriptionRef.current.value || project.description;
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

  const handleOnClose = () => {
    setMembers(project.members || []);
    onClose();
  };
  const Field = [
    {
      id: "projectName",
      label: "Project Name",
      placeHolder: project.name || "Enter project name",
      defaultValue: project.name,
      ref: nameRef,
    },
    {
      id: "projectDescription",
      label: "Project Description",
      placeHolder: project.description || "Enter project description",
      defaultValue: project.description,
      ref: descriptionRef,
    },
  ];

  console.log("EditProject component received project:", project);

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Edit Project
      </h1>
      <form className="w-full max-w-sm bg-white shadow-md rounded p-6 mt-4 space-y-4">
        {/* Input Fields */}
        {Field.map((input) => (
          <Input
            key={input.id}
            id={input.id}
            label={input.label}
            placeHolder={input.placeHolder}
            defaultValue={input.defaultValue}
            ref={input.ref}
          />
        ))}
        {/* Error Message */}
        {errorField === "noChanges" && (
          <p className="text-red-500 text-sm">No changes to update.</p>
        )}
        {/* Members List */}
        {project && members && (
          <div className=" space-y-2">
            <p className="text-gray-700 text-sm font-semibold">
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
        <div className="flex space-x-4 justify-center">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            onClick={handleUpdateProject}
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
