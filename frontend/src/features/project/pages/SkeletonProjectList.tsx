// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonProjectList() {
  return (
    <div className="space-y-4">
      {/* Top controls: search + filters + create */}
      <Card className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center space-x-2 w-full gap-y-2">
          <Skeleton className="h-10 w-full sm:w-1/3 rounded bg-muted dark:bg-muted" />
          <Skeleton className="h-10 w-32 rounded bg-muted dark:bg-muted" />
          <Skeleton className="h-10 w-32 rounded bg-muted dark:bg-muted" />
          <Skeleton className="h-10 w-40 rounded bg-muted dark:bg-muted ml-auto" />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
        {/* Owned projects grid */}
        <div className="space-y-4 border-r border-gray-200 dark:border-gray-700 pr-2">
          <Skeleton className="h-8 w-40 mx-auto rounded bg-muted dark:bg-muted mb-4" />
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
            {Array.from({ length: 6 }).map((_, idx) => (
              <li key={idx}>
                <Card className="p-4 space-y-2 block h-[160px]">
                  <Skeleton className="h-5 w-3/4 rounded bg-muted dark:bg-muted" />
                  <Skeleton className="h-4 w-full rounded bg-muted dark:bg-muted mt-3" />
                  <Skeleton className="h-4 w-5/6 rounded bg-muted dark:bg-muted mt-2" />
                  <div className="flex justify-end mt-auto pt-4">
                    <Skeleton className="w-24 h-8 rounded bg-muted dark:bg-muted" />
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>

        {/* Member projects grid */}
        <div className="space-y-4 border-l border-gray-200 dark:border-gray-700 pl-2">
          <Skeleton className="h-8 w-56 mx-auto rounded bg-muted dark:bg-muted mb-4" />
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
            {Array.from({ length: 6 }).map((_, idx) => (
              <li key={idx}>
                <Card className="p-4 space-y-2 block h-[160px]">
                  <Skeleton className="h-5 w-3/4 rounded bg-muted dark:bg-muted" />
                  <Skeleton className="h-4 w-full rounded bg-muted dark:bg-muted mt-3" />
                  <Skeleton className="h-4 w-5/6 rounded bg-muted dark:bg-muted mt-2" />
                  <div className="flex justify-end mt-auto pt-4">
                    <Skeleton className="w-24 h-8 rounded bg-muted dark:bg-muted" />
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProjectList;
