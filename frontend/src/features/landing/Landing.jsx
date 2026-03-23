import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../../shared/layout/MainLayout";
import Button from "../../shared/ui/Button";
import RunningClockCanvas from "./RunningClockCanvas";

import { motion as Motion } from "framer-motion";
import { inViewOptions, item } from "../../app/motionConfig";

import { useAuth } from "../auth/context/useAuth";
import { useTheme } from "../../shared/context/useTheme";
function Landing() {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const { theme } = useTheme();
  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
    }
  }, [isLogin, navigate]);
  if (isLogin) {
    return null;
  }
  return (
    <MainLayout isLogin={isLogin}>
      <div className="text-center mt-20 space-y-6">
        <Motion.h1
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="text-4xl font-bold "
        >
          Welcome to Team Task Manager
        </Motion.h1>
        <Motion.p
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="text-lg"
        >
          Organize your team's tasks efficiently and effectively.
        </Motion.p>

        <Motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
        >
          <RunningClockCanvas theme={theme} />
        </Motion.div>
        <Motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
        >
          <Link to="/login">
            <Button variant="primary" size="large">
              Get Started
            </Button>
          </Link>
        </Motion.div>
      </div>
    </MainLayout>
  );
}
export default Landing;
