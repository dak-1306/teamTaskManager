// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonTaskSearch() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48 rounded bg-muted dark:bg-muted mb-2" />
      <Skeleton className="h-4 w-64 rounded bg-muted dark:bg-muted mb-4" />
      <Skeleton className="w-48 h-8 rounded bg-muted dark:bg-muted" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card key={idx} className="p-4 space-y-3">
            <Skeleton className="h-6 w-3/4 rounded bg-muted dark:bg-muted" />
            <Skeleton className="h-4 w-full rounded bg-muted dark:bg-muted" />
            <Skeleton className="h-4 w-1/2 rounded bg-muted dark:bg-muted mt-2" />
            <Skeleton className="h-4 w-1/3 rounded bg-muted dark:bg-muted" />
            <Skeleton className="h-4 w-1/3 rounded bg-muted dark:bg-muted" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-5 w-24 rounded bg-muted dark:bg-muted" />
              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4/5 rounded bg-muted dark:bg-muted" />
                ))}
              </div>
            </div>
            <div className="pt-3">
              <Skeleton className="w-28 h-8 rounded bg-muted dark:bg-muted" />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Skeleton className="h-10 w-64 rounded bg-muted dark:bg-muted" />
      </div>
    </div>
  );
}

export default SkeletonTaskSearch;
