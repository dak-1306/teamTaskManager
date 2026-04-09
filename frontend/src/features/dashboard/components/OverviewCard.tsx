import { Card } from "../../../components/ui/card";

import { StickyNote } from "lucide-react";
const colorBgIcon = {
  totalProject: "bg-blue-100 dark:bg-blue-900",
  totalTask: "bg-green-100 dark:bg-green-900",
  completedTask: "bg-yellow-100 dark:bg-yellow-900",
  progressTask: "bg-red-100 dark:bg-red-900",
};
type OverviewCardProps = {
  title?: string;
  value?: number;
  icon?: React.ReactNode;
  color?: keyof typeof colorBgIcon;
};
function OverviewCard({ title, value, icon, color }: OverviewCardProps) {
  const defaultIcon = <StickyNote size={24} />;
  const defaultValue = 0;
  const defaultTitle = "Overview";
  return (
    <Card>
      <div className="flex items-center gap-6 mx-auto">
        <div
          className={`p-3 rounded-full ${color ? colorBgIcon[color] : colorBgIcon.totalProject}`}
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
      </div>
    </Card>
  );
}

export default OverviewCard;
