import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { useRef, useState } from "react";

import useProjectStore from "../stores/projectStore";

function AddMember({ isOpen, onClose, projectId }) {
  const memberEmailRef = useRef();
  const [error, setError] = useState(null);
  const { addMemberProject } = useProjectStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberEmail = memberEmailRef.current.value;
    if (!memberEmail) {
      setError("Email is required");
      return;
    }
    if (memberEmail) {
      addMemberProject(projectId, memberEmail);
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Add Member
      </h1>
      <form
        className="w-full max-w-sm bg-white shadow-md rounded p-6 mt-4"
        onSubmit={handleSubmit}
      >
        <Input
          id="memberEmail"
          label="Member Email"
          placeHolder="Enter member email"
          ref={memberEmailRef}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex space-x-4 justify-center ">
          <Button type="submit" variant="primary" size="medium">
            Add Member
          </Button>
          <Button variant="secondary" size="medium" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default AddMember;
