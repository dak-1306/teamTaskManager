import Button from "../ui/Button";
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Task Manager</h1>
        <ul>
          <li className="inline-block mr-4">
            <Link to="/dashboard" className="hover:underline">
              Home
            </Link>
          </li>
          <li className="inline-block mr-4">
            <Link to="/tasks" className="hover:underline">
              Tasks
            </Link>
          </li>
          <li className="inline-block mr-4">
            <Link to="/projects" className="hover:underline">
              Projects
            </Link>
          </li>
          <li className="inline-block mr-4">
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li className="inline-block">
            <Button
              variant="primary"
              size="medium"
              onClick={() => alert("Get Started clicked!")}
            >
              Get started
            </Button>
          </li>
        </ul>
      </header>
    </>
  );
}
export default Header;
