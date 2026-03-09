import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { useAuth } from "../hooks/useAuth";
function Register() {
  const navigate = useNavigate();
  const [errorField, setErrorField] = useState(null);

  const { register, error } = useAuth();

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
    <div className="bg-gray-100">
      <AuthForm
        onSubmit={handleSubmit}
        field={field}
        title="Register"
        error={error}
        errorField={errorField}
      />
    </div>
  );
}
export default Register;
