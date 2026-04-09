import { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthBackground from "../components/AuthBackground";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
function Register() {
  const navigate = useNavigate();
  const [errorField, setErrorField] = useState<string | null>(null);

  const { register, error, loading } = useAuth() as any;

  // State cho các trường nhập liệu
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Xử lý Đăng ký
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      state: username,
      setState: setUsername,
    },
    {
      id: "email",
      type: "email",
      placeHolder: "Email",
      label: "Email",
      state: email,
      setState: setEmail,
    },
    {
      id: "password",
      type: "password",
      placeHolder: "Password",
      label: "Password",
      state: password,
      setState: setPassword,
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
