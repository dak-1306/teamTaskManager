import React, { useRef, useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthBackground from "../components/AuthBackground";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const navigate = useNavigate();

  const { login, error, loading } = useAuth() as any;

  // Refs cho các trường nhập liệu
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [errorField, setErrorField] = useState<string | null>(null);
  // Xử lý Đăng nhập
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorField(null);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email) {
      setErrorField("email");
      return;
    }
    if (!password) {
      setErrorField("password");
      return;
    }

    console.log("Login attempt with:", { email, password });
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Error logging in user:", message);
    }
  };

  // Cấu hình các trường nhập liệu cho AuthForm
  const field = [
    {
      id: "email",
      type: "email",
      placeHolder: "Email",
      label: "Email",
      ref: emailRef,
    },
    {
      id: "password",
      type: "password",
      placeHolder: "Password",
      label: "Password",
      ref: passwordRef,
    },
  ];

  return (
    <AuthBackground>
      <AuthForm
        onSubmit={handleSubmit}
        field={field}
        title="Login"
        error={error}
        errorField={errorField}
        loading={loading}
      />
    </AuthBackground>
  );
}
export default Login;
