import ConfirmDialog from "../../../shared/ui/ConfirmDialog";
import useProjectStore from "../stores/projectStore";

function DeleteProject({ isOpen, onClose, project }) {
  const { deleteProject } = useProjectStore();
  const id = project._id;
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        deleteProject(id);
        onClose();
      }}
      title={`Delete Project ${id}`}
      message="Are you sure you want to delete this project? This action cannot be undone."
    />
  );
}

export default DeleteProject;
