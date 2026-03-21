import React from "react";
import Card from "../../../shared/ui/Card";
import SkeletonText from "../../../shared/skeleton/SkeletonText";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";
import SkeletonAvatar from "../../../shared/skeleton/SkeletonAvatar";

function SkeletonProjectList() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center">My Projects</h1>

      {/* Top controls: search + filters + create */}
      <Card>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="w-32">
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="w-32">
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <SkeletonButton width="w-44" height="h-10" />
        </div>
      </Card>

      {/* Owned projects grid */}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <li key={idx}>
            <Card className="p-4">
              <div className="space-y-2">
                <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="flex justify-end mt-2">
                  <SkeletonButton width="w-24" height="h-8" />
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <h2 className="text-xl font-semibold text-center">
        Projects I'm a Member Of
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <li key={idx}>
            <Card className="p-4">
              <div className="space-y-2">
                <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="flex justify-end mt-2">
                  <SkeletonButton width="w-24" height="h-8" />
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkeletonProjectList;
