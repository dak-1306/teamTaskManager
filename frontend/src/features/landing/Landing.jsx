import MainLayout from "../../shared/layout/MainLayout";
import Button from "../../shared/ui/Button";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <MainLayout>
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Team Task Manager
        </h1>
        <p className="text-lg mb-8">
          Organize your team's tasks efficiently and effectively.
        </p>
        <Link to="/login">
          <Button variant="primary" size="medium">
            Get Started
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}
export default Landing;
