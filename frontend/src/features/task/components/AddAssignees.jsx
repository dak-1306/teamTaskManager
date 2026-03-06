import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { useRef } from "react";

import useTaskStore from "../stores/taskStore";

function AddAssignees({ isOpen, onClose, taskId }) {
  const memberEmailRef = useRef();
  const { addAssignees } = useTaskStore();

  console.log("AddAssignees component received taskId:", taskId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberEmail = memberEmailRef.current.value;
    if (memberEmail) {
      addAssignees(taskId, memberEmail);
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold">Add Assignees</h1>
      <form
        className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <Input
          id="memberEmail"
          label="Member Email"
          placeHolder="Enter member email"
          ref={memberEmailRef}
        />
        <div className="flex space-x-4">
          <Button type="submit" variant="primary" size="medium">
            Add Assignee
          </Button>
          <Button variant="secondary" size="medium" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default AddAssignees;
