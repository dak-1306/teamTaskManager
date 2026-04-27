import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "../utils/schemal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AuthCard from "../components/AuthCard";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Eye, EyeOff } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const { registerContext, error, loading } = useAuth() as any;

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerContext(data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  return (
    <AuthCard
      title="Register"
      description="Create a new account"
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      isSubmitting={isSubmitting}
      error={error}
      action={
        <Button variant="link" onClick={() => navigate("/login")}>
          Login
        </Button>
      }
      footer={
        <Button variant="outline" className="w-full">
          Register with Google
        </Button>
      }
    >
      {/* Username */}
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="yourname"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="grid gap-2 relative">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
        />

        <button
          type="button"
          className="absolute right-2 top-8"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
    </AuthCard>
  );
}

export default Register;
