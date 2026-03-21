import React from "react";
import Card from "../../../shared/ui/Card";
import SkeletonText from "../../../shared/skeleton/SkeletonText";
import SkeletonAvatar from "../../../shared/skeleton/SkeletonAvatar";

function SkeletonOverview() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card key={idx} className="p-4">
          <div className="flex items-center space-x-4">
            <SkeletonAvatar size={12} />
            <div className="flex-1">
              <SkeletonText lines={1} />
              <div className="mt-2">
                <div className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default SkeletonOverview;
