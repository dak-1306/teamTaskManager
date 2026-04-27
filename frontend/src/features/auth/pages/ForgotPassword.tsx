import AuthCard from "../components/AuthCard";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordData } from "../utils/schemal";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      navigate("/reset-password");
    } catch (error) {
      console.error(
        "Error occurred while submitting forgot password form:",
        error,
      );
    }
  };

  return (
    <AuthCard
      title="Forgot Password"
      description="Enter your email to reset your password"
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
      {/* Email */}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
    </AuthCard>
  );
}
