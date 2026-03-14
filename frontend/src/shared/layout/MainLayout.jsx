import Header from "./Header";
import Footer from "./Footer";

function MainLayout({ children, isLogin }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLogin={isLogin} />
      <main className="flex-1 pt-16 container mx-auto p-4 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-900">
        <div className="mt-4 max-w-6xl mx-auto space-y-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
export default MainLayout;
