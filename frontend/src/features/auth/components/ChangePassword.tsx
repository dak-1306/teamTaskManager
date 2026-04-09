import React, { useRef, useState } from "react";

import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "../../../components/ui/field";

import { useAuth } from "../context/AuthContext";

type ChangePasswordProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
};

function ChangePassword({ isOpen, onClose, userId }: ChangePasswordProps) {
  const currentPasswordRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const [errorField, setErrorField] = useState<string | null>(null);

  const { changePasswordUser } = useAuth() as any;

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPassword = currentPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>

          <form
            className="w-full max-w-sm mt-2 space-y-4"
            onSubmit={handleChangePassword}
          >
            <Field>
              <FieldLabel htmlFor="currentPassword">
                Current Password
              </FieldLabel>
              <FieldContent>
                <Input
                  id="currentPassword"
                  type="password"
                  ref={currentPasswordRef}
                />
                {errorField === "currentPassword" && (
                  <FieldError>This field is required</FieldError>
                )}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
              <FieldContent>
                <Input id="newPassword" type="password" ref={newPasswordRef} />
                {errorField === "newPassword" && (
                  <FieldError>This field is required</FieldError>
                )}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm New Password
              </FieldLabel>
              <FieldContent>
                <Input
                  id="confirmPassword"
                  type="password"
                  ref={confirmPasswordRef}
                />
                {errorField === "confirmPassword" && (
                  <FieldError>Passwords do not match</FieldError>
                )}
              </FieldContent>
            </Field>

            <DialogFooter className="flex justify-center gap-4">
              <Button type="submit" variant="default" size="default">
                Change Password
              </Button>
              <DialogClose asChild>
                <Button variant="outline" size="default">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default ChangePassword;
