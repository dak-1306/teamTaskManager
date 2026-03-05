import ConfirmDialog from "../../../shared/ui/ConfirmDialog";
import useTaskStore from "../stores/taskStore";

import { useNavigate } from "react-router-dom";

function DeleteTask({ open, onClose, taskId }) {
  const { deleteTask } = useTaskStore();
  const navigate = useNavigate();

  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={() => {
        onClose();
        deleteTask(taskId);
        navigate(-1);
      }}
      title="Delete Task"
      message="Are you sure you want to delete this task?"
    />
  );
}
export default DeleteTask;
