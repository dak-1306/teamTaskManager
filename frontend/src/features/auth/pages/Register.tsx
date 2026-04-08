import React, { useRef, useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthBackground from "../components/AuthBackground";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";
function Register() {
  const navigate = useNavigate();
  const [errorField, setErrorField] = useState<string | null>(null);

  const { register, error, loading } = useAuth() as any;

  // Refs cho các trường nhập liệu
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  // Xử lý Đăng ký
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    setErrorField(null);
    if (!username) {
      setErrorField("username");
      return;
    }
    if (!email) {
      setErrorField("email");
      return;
    }
    if (!password) {
      setErrorField("password");
      return;
    }

    console.log("Register attempt with:", { username, email, password });
    register({ username, email, password });
    navigate("/login");
  };

  // Cấu hình các trường nhập liệu cho AuthForm
  const field = [
    {
      id: "username",
      type: "text",
      placeHolder: "Username",
      label: "Username",
      ref: usernameRef,
    },
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
        error={error}
        title="Register"
        errorField={errorField}
        loading={loading}
      />
    </AuthBackground>
  );
}
export default Register;
