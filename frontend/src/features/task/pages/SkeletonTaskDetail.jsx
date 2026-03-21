import React from "react";
import Card from "../../../shared/ui/Card";
import SkeletonText from "../../../shared/skeleton/SkeletonText";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";
import SkeletonAvatar from "../../../shared/skeleton/SkeletonAvatar";

function SkeletonTaskDetail() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        <div className="mx-auto h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
      </h1>

      <Card>
        <div className="flex items-center justify-start space-x-3">
          <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-32 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1" />
          <div className="flex items-center space-x-2">
            <SkeletonButton width="w-36" height="h-10" />
            <SkeletonButton width="w-36" height="h-10" />
            <SkeletonButton width="w-36" height="h-10" />
            <SkeletonButton width="w-36" height="h-10" />
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-3">
          <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div>
            <strong>Assignees:</strong>
            <ul className="list-none mt-2 space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <SkeletonAvatar size={8} />
                  <div className="h-3 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SkeletonTaskDetail;
