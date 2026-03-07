import MainLayout from "../../../shared/layout/MainLayout";

import OverviewPage from "./OverviewPage";
import MyTaskPage from "./MyTaskPage";
import RecentProjectPage from "./RecentProjectPage";

function Dashboard() {
  return (
    <MainLayout isLogin={true}>
      <div className="space-y-6 mt-4">
        <h1 className="text-2xl font-bold text-foreground text-center">
          Dashboard
        </h1>
        <OverviewPage />
        <hr className="border-gray-300" />
        <h2 className="text-xl font-bold text-foreground text-center">
          My Tasks
        </h2>
        <MyTaskPage />
        <hr className="border-gray-300" />
        <h2 className="text-xl font-bold text-foreground text-center">
          Recent Projects
        </h2>
        <RecentProjectPage />
      </div>
    </MainLayout>
  );
}
export default Dashboard;
