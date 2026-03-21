import React from "react";
import Card from "../../../shared/ui/Card";
import SkeletonText from "../../../shared/skeleton/SkeletonText";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";
import SkeletonAvatar from "../../../shared/skeleton/SkeletonAvatar";

function SkeletonMyTask() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card key={idx} className="mb-4 p-4">
          <div className="flex items-center space-x-4">
            <SkeletonAvatar size={12} />
            <div className="flex-1">
              <SkeletonText lines={2} />
              <div className="mt-3 flex items-center justify-between">
                <SkeletonText lines={1} />
                <SkeletonButton width="w-20" height="h-8" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default SkeletonMyTask;
