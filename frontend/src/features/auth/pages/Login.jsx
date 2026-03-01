import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRef } from "react";
function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  // Refs cho các trường nhập liệu
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Xử lý Đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log("Login attempt with:", { email, password });
    login({ email, password });
    navigate("/dashboard");
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
    <div className="bg-gray-100">
      <AuthForm onSubmit={handleSubmit} field={field} title="Login" />
    </div>
  );
}
export default Login;
