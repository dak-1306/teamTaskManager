// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonTaskDetail() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        <Skeleton className="mx-auto h-8 w-64 rounded" />
      </h1>

      <Card>
        <div className="flex items-center justify-start space-x-3">
          <Skeleton className="h-10 w-10 rounded" />
          <Skeleton className="h-10 w-32 rounded" />
          <div className="flex-1" />
          <div className="flex items-center space-x-2">
            <Skeleton className="w-36 h-10 rounded" />
            <Skeleton className="w-36 h-10 rounded" />
            <Skeleton className="w-36 h-10 rounded" />
            <Skeleton className="w-36 h-10 rounded" />
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-3">
          <Skeleton className="h-4 w-1/3 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-1/4 rounded" />
          <Skeleton className="h-4 w-1/4 rounded" />
          <div>
            <strong>Assignees:</strong>
            <ul className="list-none mt-2 space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-3 w-40 rounded" />
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
