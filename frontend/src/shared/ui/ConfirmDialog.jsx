import Modal from "./Modal";
import Button from "./Button";

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="mb-6 dark:text-gray-300">{message}</p>
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" size="medium" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" size="medium" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
export default ConfirmDialog;
