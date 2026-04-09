// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonSearch() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <Skeleton className="h-10 rounded bg-muted" />
        </div>
        <Skeleton className="w-24 h-10 rounded bg-muted" />
      </div>

      <div>
        <Skeleton className="h-6 w-48 rounded bg-muted mb-2" />
        <Card className="mb-3">
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-2">
                <Skeleton className="h-5 w-3/4 rounded bg-muted" />
                <Skeleton className="h-4 w-full rounded bg-muted mt-2" />
                <div className="flex justify-end mt-2">
                  <Skeleton className="w-24 h-8 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <Skeleton className="h-6 w-48 rounded bg-muted mb-2" />
        <Card>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-2">
                <Skeleton className="h-5 w-3/4 rounded bg-muted" />
                <Skeleton className="h-4 w-full rounded bg-muted mt-2" />
                <div className="flex justify-end mt-2">
                  <Skeleton className="w-24 h-8 rounded bg-muted" />
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
