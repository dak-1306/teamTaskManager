import React from "react";
import Card from "../../../shared/ui/Card";
import SkeletonAvatar from "../../../shared/skeleton/SkeletonAvatar";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";
import SkeletonText from "../../../shared/skeleton/SkeletonText";

function SkeletonProfile() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="space-y-6">
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold mb-2">
            <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          </h2>
          <div className="flex items-center space-x-4">
            <SkeletonAvatar size={16} />
            <div className="flex-1">
              <div className="h-5 w-48 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700 mt-2" />
            </div>
          </div>

          <div className="flex space-x-2">
            <SkeletonButton width="w-28" height="h-10" />
            <SkeletonButton width="w-28" height="h-10" />
          </div>
        </Card>

        <Card className="space-x-4">
          <SkeletonButton width="w-48" height="h-10" />
          <SkeletonButton width="w-36" height="h-10" />
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        </Card>
      </div>
    </div>
  );
}

export default SkeletonProfile;
