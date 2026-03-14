import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import MainLayout from "../../shared/layout/MainLayout";
import Button from "../../shared/ui/Button";

import { useAuth } from "../auth/context/useAuth";
function Landing() {
  const navigate = useNavigate();
  const { isLogin, checkLoginStatus } = useAuth();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  if (isLogin) {
    navigate("/dashboard");
  }
  return (
    <MainLayout isLogin={isLogin}>
      <div className="text-center mt-20 space-y-6">
        <h1 className="text-4xl font-bold ">Welcome to Team Task Manager</h1>
        <p className="text-lg">
          Organize your team's tasks efficiently and effectively.
        </p>
        <Link to="/login">
          <Button variant="primary" size="large">
            Get Started
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}
export default Landing;
