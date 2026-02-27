import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

function EditProject({ isOpen, onClose, project }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold">Edit Project</h1>
      <form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Input
          id="projectName"
          label="Project Name"
          placeHolder="Enter project name"
          defaultValue={project?.name || ""}
        />
        <Input
          id="projectDescription"
          label="Project Description"
          placeHolder="Enter project description"
          defaultValue={project?.description || ""}
        />
        <div className="flex space-x-4">
          <Button type="submit" variant="primary" size="medium">
            Update Project
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
