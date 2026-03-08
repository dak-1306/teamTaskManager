import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { useRef } from "react";

import { useAuth } from "../hooks/useAuth";

function EditProfile({ user, isOpen, onClose }) {
  const usernameRef = useRef();
  const emailRef = useRef();
  const { updateInfoUser } = useAuth();

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
    };
    console.log("Updating user with data:", updatedData);
    updateInfoUser(user._id,updatedData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Edit Profile
      </h1>
      <form
        className="w-full max-w-sm bg-white shadow-md rounded p-6 mt-4 space-y-4"
        onSubmit={handleSaveChanges}
      >
        <Input
          id="username"
          label="Username"
          placeHolder={user.username || "Enter username"}
          defaultValue={user.username}
          ref={usernameRef}
        />
        <Input
          id="email"
          label="Email"
          placeHolder={user.email || "Enter email"}
          defaultValue={user.email}
          ref={emailRef}
        />
        <div className="flex space-x-4 justify-center">
          <Button type="submit" variant="primary" size="medium">
            Save Changes
          </Button>
          <Button variant="secondary" size="medium" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditProfile;
