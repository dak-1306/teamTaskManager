// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonProjectDetail() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar skeleton (project info) */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full bg-muted dark:bg-muted" />
                <div>
                  <Skeleton className="h-6 w-48 rounded bg-muted" />
                  <Skeleton className="h-3 w-32 mt-2 rounded bg-muted" />
                </div>
              </div>
              <div className="flex flex-col space-y-2 w-28">
                <Skeleton className="w-full h-10 rounded bg-muted" />
                <Skeleton className="w-full h-10 rounded bg-muted" />
                <Skeleton className="w-full h-10 rounded bg-muted" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4 rounded bg-muted" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-full rounded bg-muted" />
                ))}
              </div>
              <div>
                <Skeleton className="h-4 w-1/3 rounded bg-muted" />
                <ul className="list-disc list-inside mt-2 space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>
                      <Skeleton className="h-3 w-40 rounded bg-muted" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Main content skeleton (tasks area) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-4">
            <Card>
              <div className="flex items-center justify-between">
                <div className="h-8 w-64 rounded bg-muted" />
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-28 rounded bg-muted" />
                  <Skeleton className="h-10 w-28 rounded bg-muted" />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx} className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4 rounded bg-muted" />
                  <Skeleton className="h-4 w-full rounded bg-muted" />
                  <Skeleton className="h-4 w-1/2 rounded bg-muted" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-24 rounded bg-muted" />
                    <Skeleton className="h-8 w-20 rounded bg-muted" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProjectDetail;
