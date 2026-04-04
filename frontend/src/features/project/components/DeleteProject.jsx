import ConfirmDialog from "../../../shared/ui/ConfirmDialog";
import useProjectStore from "../stores/projectStore";
import { useNavigate } from "react-router-dom";

function DeleteProject({ isOpen, onClose, projectId, projectName }) {
  const { deleteProject } = useProjectStore();
  const navigate = useNavigate();
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        deleteProject(projectId);
        onClose();
        navigate(-1);
      }}
      title={`Delete Project ${projectName}`}
      message="Are you sure you want to delete this project? This action cannot be undone."
    />
  );
}

export default DeleteProject;
