import React from "react";
import Card from "../../../shared/ui/Card";
import SkeletonText from "../../../shared/skeleton/SkeletonText";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";

function SkeletonSearch() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <SkeletonButton width="w-24" height="h-10" />
      </div>

      <div>
        <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
        <Card className="mb-3">
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-2">
                <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700 mt-2" />
                <div className="flex justify-end mt-2">
                  <SkeletonButton width="w-24" height="h-8" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
        <Card>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-2">
                <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700 mt-2" />
                <div className="flex justify-end mt-2">
                  <SkeletonButton width="w-24" height="h-8" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SkeletonSearch;
