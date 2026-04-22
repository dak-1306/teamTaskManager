// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonProjectDetail() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        {/* Project Info Sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <Card className="p-4">
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-10 w-10 rounded bg-muted dark:bg-muted" />
              <Skeleton className="h-6 w-3/4 rounded bg-muted dark:bg-muted" />
              <Skeleton className="h-4 w-full rounded bg-muted dark:bg-muted" />
              <div className="flex space-x-2 mt-4">
                <Skeleton className="h-10 w-32 rounded bg-muted dark:bg-muted" />
                <Skeleton className="h-10 w-10 rounded bg-muted dark:bg-muted" />
                <Skeleton className="h-10 w-10 rounded bg-muted dark:bg-muted" />
              </div>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <Skeleton className="h-4 w-1/2 rounded bg-muted dark:bg-muted" />
            <Skeleton className="h-20 w-full rounded bg-muted dark:bg-muted" />
            <Skeleton className="h-4 w-3/4 rounded bg-muted dark:bg-muted" />
            <Skeleton className="h-10 w-full rounded bg-muted dark:bg-muted mt-4" />
          </Card>
        </div>

        {/* Task List */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <Card className="p-4 flex justify-between items-center gap-4">
            <Skeleton className="h-10 flex-1 rounded bg-muted dark:bg-muted" />
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-24 rounded bg-muted dark:bg-muted" />
              <Skeleton className="h-10 w-24 rounded bg-muted dark:bg-muted" />
            </div>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Card key={idx} className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4 rounded bg-muted dark:bg-muted" />
                <Skeleton className="h-4 w-full rounded bg-muted dark:bg-muted" />
                <Skeleton className="h-4 w-1/2 rounded bg-muted dark:bg-muted" />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-1">
                    <Skeleton className="h-6 w-8 rounded-full bg-muted dark:bg-muted" />
                    <Skeleton className="h-6 w-8 rounded-full bg-muted dark:bg-muted" />
                  </div>
                  <Skeleton className="h-8 w-20 rounded bg-muted dark:bg-muted" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat / Conversation */}
        <Card className="col-span-12 lg:col-span-4 space-y-4">
          <div className="p-4 flex flex-col space-y-4 h-[300px]">
            <Skeleton className="h-full w-full rounded bg-muted dark:bg-muted" />
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="p-4 flex flex-col space-y-4 h-[300px]">
            <Skeleton className="h-full w-full rounded bg-muted dark:bg-muted" />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SkeletonProjectDetail;
