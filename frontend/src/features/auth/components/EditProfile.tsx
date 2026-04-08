import React, { useEffect, useState } from "react";

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
import { Field, FieldLabel, FieldContent } from "../../../components/ui/field";

import { useAuth } from "../context/useAuth";

type EditProfileProps = {
  user: any;
  isOpen: boolean;
  onClose: () => void;
};

function EditProfile({ user, isOpen, onClose }: EditProfileProps) {
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(user?.username ?? "");
  const [email, setEmail] = useState<string>(user?.email ?? "");
  const { updateInfoUser } = useAuth() as any;

  useEffect(() => {
    if (isOpen) {
      setUsername(user?.username ?? "");
      setEmail(user?.email ?? "");
      setUpdateError(null);
    }
  }, [isOpen, user]);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      username: username || undefined,
      email: email || undefined,
    };
    if (
      updatedData.username === user?.username &&
      updatedData.email === user?.email
    ) {
      setUpdateError("No changes to update.");
      return;
    }
    updateInfoUser(user._id, updatedData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <form
            className="w-full max-w-sm mt-2 space-y-4"
            onSubmit={handleSaveChanges}
          >
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <FieldContent>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FieldContent>
            </Field>

            {updateError && <p className="text-red-500">{updateError}</p>}

            <DialogFooter className="flex justify-center gap-4">
              <Button type="submit" variant="default" size="default">
                Save Changes
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

export default EditProfile;
