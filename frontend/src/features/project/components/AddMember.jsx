import { useRef, useState } from "react";

import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import useProjectStore from "../stores/projectStore";
import { useAuth } from "../../auth/context/useAuth";

function AddMember({ isOpen, onClose, projectId }) {
  const memberEmailRef = useRef();

  const { addMemberProject } = useProjectStore();

  const { usersForAddMember } = useAuth();
  console.log(
    "Users for add member project in AddMember component:",
    usersForAddMember,
  );

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
        <select
          id="memberEmail"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-500 focus:outline-none focus:shadow-outline mb-4"
          ref={memberEmailRef}
        >
          <option value="">Select a member</option>
          {usersForAddMember && usersForAddMember.length > 0 ? (
            usersForAddMember.map((user) => (
              <option key={user._id} value={user.email}>
                {user.username} ({user.email})
              </option>
            ))
          ) : (
            <option value="" disabled>
              No users available
            </option>
          )}
        </select>
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
