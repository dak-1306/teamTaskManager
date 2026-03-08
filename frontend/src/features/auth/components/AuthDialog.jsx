import ConfirmDialog from "../../../shared/ui/ConfirmDialog";

function AuthDialog({ isOpen, onClose, title, message, onConfirm }) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        onConfirm();
        onClose();
      }}
      title={title}
      message={message}
    />
  );
}
export default AuthDialog;
