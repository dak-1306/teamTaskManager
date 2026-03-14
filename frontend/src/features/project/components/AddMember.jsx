import { useRef, useState } from "react";

import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import useProjectStore from "../stores/projectStore";

function AddMember({ isOpen, onClose, projectId }) {
  const memberEmailRef = useRef();

  const { addMemberProject } = useProjectStore();

  const [errorField, setErrorField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberEmail = memberEmailRef.current.value;
    if (!memberEmail) {
      setErrorField("Email is required");
      return;
    }
    if (memberEmail) {
      addMemberProject(projectId, memberEmail);
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Member to Project">
      <form
        className="w-full max-w-sm bg-white dark:bg-gray-700 dark:shadow-md rounded p-6 mt-4"
        onSubmit={handleSubmit}
      >
        <Input
          id="memberEmail"
          label="Member Email"
          placeHolder="Enter member email"
          ref={memberEmailRef}
        />
        {errorField && <p className="text-red-500 text-sm">{errorField}</p>}
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
