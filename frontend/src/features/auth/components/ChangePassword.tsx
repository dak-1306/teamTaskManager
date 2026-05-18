import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, ChangePasswordData } from "../utils/schemas";

import { useChangePassword } from "../mutations/useChangePassword";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

type ChangePasswordProps = {
  userId: string;
};

function ChangePassword({ userId }: ChangePasswordProps) {
  const { mutate: changePasswordUser, isPending, error } = useChangePassword();

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "Failed to change password. Please try again.",
      );
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordData) => {
    changePasswordUser(
      ({ userId, ...data }),
      {
        onSuccess: () => {
          toast.success("Password changed successfully");
          setTimeout(() => toast.dismiss(), 3000);
        },
      },
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your account password</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Current Password */}
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label htmlFor="confirmNewPassword">Confirm Password</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              {...register("confirmNewPassword")}
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Change Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default ChangePassword;
