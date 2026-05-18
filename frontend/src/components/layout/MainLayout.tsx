import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header />
      <main className="flex-1 pt-16 w-full flex justify-center items-center text-foreground bg-background">
        <div className="w-full h-full p-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default MainLayout;
