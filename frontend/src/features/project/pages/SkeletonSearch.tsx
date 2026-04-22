// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonSearch() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded bg-muted dark:bg-muted" />
          <Skeleton className="h-4 w-64 rounded bg-muted dark:bg-muted" />
        </div>
        <Skeleton className="w-32 h-10 rounded bg-muted dark:bg-muted" />
      </div>

      <div>
        <Skeleton className="h-6 w-48 rounded bg-muted dark:bg-muted mb-4 hidden" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx} className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4 rounded bg-muted dark:bg-muted" />
                <Skeleton className="h-4 w-full rounded bg-muted dark:bg-muted mt-2" />
                <div className="pt-4">
                  <Skeleton className="w-28 h-8 rounded bg-muted dark:bg-muted" />
                </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="h-7 w-48 rounded bg-muted dark:bg-muted mb-4 mt-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx} className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4 rounded bg-muted dark:bg-muted" />
                <Skeleton className="h-4 w-full rounded bg-muted dark:bg-muted mt-2" />
                <div className="pt-4">
                  <Skeleton className="w-28 h-8 rounded bg-muted dark:bg-muted" />
                </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkeletonSearch;
