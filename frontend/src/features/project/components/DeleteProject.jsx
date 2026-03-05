import ConfirmDialog from "../../../shared/ui/ConfirmDialog";
import useProjectStore from "../stores/projectStore";

function DeleteProject({ isOpen, onClose, projectId }) {
  const { deleteProject } = useProjectStore();
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        deleteProject(projectId);
        onClose();
      }}
      title={`Delete Project ${projectId}`}
      message="Are you sure you want to delete this project? This action cannot be undone."
    />
  );
}

export default DeleteProject;
