import Modal from "./Modal";
import Button from "./Button";

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="mb-6">{message}</p>
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
