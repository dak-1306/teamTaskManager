import Card from "../../../shared/ui/Card";

import { StickyNote } from "lucide-react";
const colorBgIcon = {
  totalProject: "bg-blue-100 dark:bg-blue-900",
  totalTask: "bg-green-100 dark:bg-green-900",
  completedTask: "bg-yellow-100 dark:bg-yellow-900",
  progressTask: "bg-red-100 dark:bg-red-900",
};
function OverviewCard({ title, value, icon, color }) {
  const defaultIcon = <StickyNote size={24} />;
  const defaultValue = 0;
  const defaultTitle = "Overview";
  return (
    <Card animation={true} className="flex items-center space-x-4">
      <div
        className={`p-3 rounded-full ${colorBgIcon[color] || colorBgIcon.totalProject}`}
      >
        {icon || defaultIcon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          {title || defaultTitle}
        </p>
        <p className="text-2xl font-bold">
          {value !== undefined ? value : defaultValue}
        </p>
      </div>
    </Card>
  );
}

export default OverviewCard;
