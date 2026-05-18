import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import LogoWeb from "@/assets/icons/Logo-web.svg";
import LogoColor from "@/assets/icons/Logo-color.svg";
import { useTheme } from "@/context/ThemContext";
import { cn } from "@/lib/utils";

function Header() {
  const { theme } = useTheme();
  return (
    <>
      <header className="fixed top-0 left-0 w-full border border-b bg-transparent backdrop-blur-sm h-16 px-8 flex justify-between items-center z-60">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <img
              src={theme === "light" ? LogoColor : LogoWeb}
              alt="Team Task Manager"
              className="w-8"
            />
            <h1
              className={cn(
                "text-2xl font-bold",
                theme === "light" ? "text-primary" : "text-primary-foreground",
              )}
            >
              Team Task Manager
            </h1>
          </div>
        </Link>

        <ul>
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
        </ul>
      </header>
    </>
  );
}
export default Header;
