// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonTaskSearch() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Task Search</h1>
      <div className="mb-4 flex items-center space-x-3">
        <div className="w-1/2">
          <Skeleton className="h-10 rounded" />
        </div>
        <Skeleton className="w-28 h-10 rounded" />
        <div className="flex-1" />
        <Skeleton className="w-28 h-10 rounded" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card key={idx} className="p-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
              <div>
                <h3 className="font-semibold">Assignees:</h3>
                <ul className="list-none mt-2 space-y-1">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-3 w-32 rounded" />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end">
                <Skeleton className="w-24 h-8 rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Skeleton className="h-10 w-64 rounded" />
      </div>
    </div>
  );
}

export default SkeletonTaskSearch;
