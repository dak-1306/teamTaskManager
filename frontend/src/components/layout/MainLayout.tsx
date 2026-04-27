import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-1 pt-16 w-full h-[calc(100vh-16rem)] mx-auto text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        <div className="w-full h-full max-w-7xl mx-auto mt-8 space-y-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default MainLayout;
