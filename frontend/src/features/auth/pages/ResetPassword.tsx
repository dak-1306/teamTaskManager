import AuthCard from "../components/AuthCard";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordData } from "../utils/schemal";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const navigate = useNavigate();

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ResetPasswordData) => {
    try {
    } catch (error) {
      console.error(
        "Error occurred while submitting reset password form:",
        error,
      );
    }
  };

  return (
    <AuthCard
      title="Reset Password"
      description="Enter your new password"
      onSubmit={handleSubmit(onSubmit)}
      loading={false}
      isSubmitting={isSubmitting}
      error={null}
      action={
        <Button variant="link" onClick={() => navigate("/login")}>
          Back to Login
        </Button>
      }
      footer={null}
    >
      {/* OTP */}
      <div className="grid gap-2">
        <Label htmlFor="otp">OTP</Label>
        <Controller
          control={form.control}
          name="otp"
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.otp && (
          <p className="text-red-500 text-sm">{errors.otp.message}</p>
        )}
      </div>

      {/* New Password */}
      <div className="grid gap-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Enter your new password"
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Confirm New Password */}
      <div className="grid gap-2">
        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
        <Input
          id="confirmNewPassword"
          type="password"
          placeholder="Confirm your new password"
          {...register("confirmNewPassword")}
        />
        {errors.confirmNewPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmNewPassword.message}
          </p>
        )}
      </div>
    </AuthCard>
  );
}
