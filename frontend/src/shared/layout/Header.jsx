import Button from "../ui/Button";
import { Link } from "react-router-dom";
function Header({ isLogin }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white h-16 px-8 flex justify-between items-center z-60">
        <Link to={`${isLogin ? "/dashboard" : "/"}`}>
          <h1 className="text-2xl font-bold">Team Task Manager</h1>
        </Link>

        <ul>
          {isLogin && (
            <div>
              <li className="inline-block mr-4">
                <Link to="/dashboard" className="hover:underline">
                  Home
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
            </div>
          )}
          {!isLogin && (
            <Link to="/register">
              <li className="inline-block">
                <Button variant="primary" size="medium">
                  Get started
                </Button>
              </li>
            </Link>
          )}
        </ul>
      </header>
    </>
  );
}
export default Header;
