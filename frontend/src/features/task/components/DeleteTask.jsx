import ConfirmDialog from "../../../shared/ui/ConfirmDialog";

function DeleteTask({ open, onClose }) {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={() => {
        onClose();
        alert("Task deleted!");
      }}
      title="Delete Task"
      message="Are you sure you want to delete this task?"
    />
  );
}
export default DeleteTask;
