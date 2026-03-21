import React from "react";
import Card from "../../../shared/ui/Card";
import SkeletonText from "../../../shared/skeleton/SkeletonText";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";
import SkeletonAvatar from "../../../shared/skeleton/SkeletonAvatar";

function SkeletonTaskSearch() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Task Search</h1>
      <div className="mb-4 flex items-center space-x-3">
        <div className="w-1/2">
          <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <SkeletonButton width="w-28" height="h-10" />
        <div className="flex-1" />
        <SkeletonButton width="w-28" height="h-10" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card key={idx} className="p-4">
            <div className="space-y-2">
              <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
              <div>
                <h3 className="font-semibold">Assignees:</h3>
                <ul className="list-none mt-2 space-y-1">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <SkeletonAvatar size={8} />
                      <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end">
                <SkeletonButton width="w-24" height="h-8" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <div className="h-10 w-64 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export default SkeletonTaskSearch;
