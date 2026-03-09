import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { useRef, useState } from "react";

import { useAuth } from "../hooks/useAuth";

function ChangePassword({ isOpen, onClose, userId }) {
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [errorField, setErrorField] = useState(null);

  const { changePasswordUser } = useAuth();
  console.log("ChangePassword component - userId:", userId);

  const handleChangePassword = (e) => {
    e.preventDefault();
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    setErrorField(null);
    if (!currentPassword) {
      setErrorField("currentPassword");
      return;
    }
    if (!newPassword) {
      setErrorField("newPassword");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorField("confirmPassword");
      return;
    }

    changePasswordUser(userId, { currentPassword, newPassword });
    onClose();
  };
  const field = [
    {
      id: "currentPassword",
      label: "Current Password",
      type: "password",
      ref: currentPasswordRef,
    },
    {
      id: "newPassword",
      label: "New Password",
      type: "password",
      ref: newPasswordRef,
    },
    {
      id: "confirmPassword",
      label: "Confirm New Password",
      type: "password",
      ref: confirmPasswordRef,
    },
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Change Password
      </h1>
      <form
        className="w-full max-w-sm bg-white shadow-md rounded p-6 mt-4 space-y-4"
        onSubmit={handleChangePassword}
      >
        {field.map((input) => (
          <div>
            <Input
              key={input.id}
              id={input.id}
              label={input.label}
              type={input.type}
              ref={input.ref}
            />
            {errorField === input.id && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
          </div>
        ))}
        <div className="flex space-x-4 justify-center">
          <Button type="submit" variant="primary" size="medium">
            Change Password
          </Button>
          <Button variant="secondary" size="medium" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ChangePassword;
