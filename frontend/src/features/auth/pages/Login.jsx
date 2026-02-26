import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRef } from "react";
function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  // Refs cho các trường nhập liệu
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // Xử lý Đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    console.log("Login attempt with:", { username, password });
    login();
    navigate("/dashboard");
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
