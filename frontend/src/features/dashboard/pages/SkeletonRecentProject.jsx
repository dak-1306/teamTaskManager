import React from "react";
import Card from "../../../shared/ui/Card";
import SkeletonText from "../../../shared/skeleton/SkeletonText";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";

function SkeletonRecentProject() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card key={idx} className="mb-4 p-4">
          <SkeletonText lines={2} />
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <SkeletonButton width="w-28" height="h-8" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default SkeletonRecentProject;
