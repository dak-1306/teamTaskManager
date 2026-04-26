import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../utils/schemal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AuthCard from "../components/AuthCard";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Eye, EyeOff } from "lucide-react";

import AuthBackground from "../components/AuthBackground";

function Login() {
  const navigate = useNavigate();
  const { login, error, loading } = useAuth() as any;

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <AuthBackground>
      <AuthCard
        title="Login"
        description="Enter your email to access your account"
        onSubmit={handleSubmit(onSubmit)}
        loading={loading}
        isSubmitting={isSubmitting}
        error={error}
        action={
          <Button variant="link" onClick={() => navigate("/register")}>
            Sign Up
          </Button>
        }
        footer={
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        }
      >
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
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <span className="ml-auto text-sm underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />

          <button
            type="button"
            className="absolute right-2 top-9"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </AuthCard>
    </AuthBackground>
  );
}

export default Login;
