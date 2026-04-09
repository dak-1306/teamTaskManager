import Header from "./Header";
import Footer from "./Footer";
import ContentWrapper from "./ContentWrapper";
type MainLayoutProps = {
  children: React.ReactNode;
  fullScreen?: boolean;
};
function MainLayout({ children, fullScreen = false }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 w-full h-full mx-auto text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-900 min-h-0">
        <ContentWrapper fullScreen={fullScreen}>{children}</ContentWrapper>
      </main>
      <Footer />
    </div>
  );
}
export default MainLayout;
