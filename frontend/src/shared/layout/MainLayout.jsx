import Header from "./Header";
import Footer from "./Footer";

import { useEffect } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
function MainLayout({ children }) {
  const { isLogin, checkLoginStatus } = useAuth();
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  console.log("MainLayout isLogin:", isLogin);
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLogin={isLogin} />
      <main className="flex-1 pt-16 container mx-auto p-4 bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default MainLayout;
