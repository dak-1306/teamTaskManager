import { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthBackground from "../components/AuthBackground";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login, error, loading } = useAuth() as any;

  // State cho các trường nhập liệu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorField, setErrorField] = useState<string | null>(null);
  // Xử lý Đăng nhập
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorField(null);
    if (!email) {
      setErrorField("email");
      return;
    }
    if (!password) {
      setErrorField("password");
      return;
    }

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
        title="Login"
        error={error}
        errorField={errorField}
        loading={loading}
      />
    </AuthBackground>
  );
}
export default Login;
