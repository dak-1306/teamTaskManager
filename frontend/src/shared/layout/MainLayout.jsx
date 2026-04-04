import Header from "./Header";
import Footer from "./Footer";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 container mx-auto p-4 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-900 flex justify-center items-start">
        <div className="mt-4  mx-auto space-y-4 w-6xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
export default MainLayout;
