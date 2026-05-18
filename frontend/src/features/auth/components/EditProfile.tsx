import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

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

import { useUpdateProfile } from "../mutations/useUpdateProfile";

import { updateProfileSchema, type UpdateProfileData } from "../utils/schemas";

import type { UserProfile } from "../utils/type";

type EditProfileProps = {
  user: UserProfile | null;

  isOpen: boolean;

  onClose: () => void;
};

function EditProfile({ user, isOpen, onClose }: EditProfileProps) {
  const {
    register,

    handleSubmit,

    reset,

    setError,

    formState: { errors, isDirty },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),

    defaultValues: {
      username: "",
      email: "",
    },
  });

  const {
    mutate: updateProfile,

    isPending,
  } = useUpdateProfile();

  useEffect(() => {
    if (!isOpen || !user) {
      return;
    }

    reset({
      username: user.username,
      email: user.email,
    });
  }, [isOpen, user, reset]);

  const onSubmit = (data: UpdateProfileData) => {
    if (!user?._id) {
      return;
    }

    if (!isDirty) {
      setError("root", {
        message: "No changes to update.",
      });

      return;
    }

    updateProfile(
      {
        userId: user._id,

        data,
      },
      {
        onSuccess: () => {
          onClose();
        },

        onError: (error) => {
          setError("root", {
            message: error instanceof Error ? error.message : "Update failed",
          });
        },
      },
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm mt-2 space-y-4"
          >
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>

              <FieldContent>
                <Input id="username" {...register("username")} />
              </FieldContent>

              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <FieldContent>
                <Input id="email" type="email" {...register("email")} />
              </FieldContent>

              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </Field>

            {errors.root && (
              <p className="text-sm text-red-500">{errors.root.message}</p>
            )}

            <DialogFooter className="flex justify-center gap-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>

              <DialogClose asChild>
                <Button type="button" variant="outline">
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
