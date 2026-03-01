import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { useAuth } from "../hooks/useAuth";
function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  // Refs cho các trường nhập liệu
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  // Xử lý Đăng ký
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
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
    <div className="bg-gray-100">
      <AuthForm onSubmit={handleSubmit} field={field} title="Register" />
    </div>
  );
}
export default Register;
