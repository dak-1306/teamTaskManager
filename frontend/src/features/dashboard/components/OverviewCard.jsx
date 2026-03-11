import Card from "../../../shared/ui/Card";

import { StickyNote } from "lucide-react";
function OverviewCard({ title, value, icon }) {
  const defaultIcon = <StickyNote size={24} />;
  const defaultValue = 0;
  const defaultTitle = "Overview";
  return (
    <Card animation={true} className="flex items-center space-x-4">
      <div className="p-3 rounded-full bg-blue-100">{icon || defaultIcon}</div>
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
