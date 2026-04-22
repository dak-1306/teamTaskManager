// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonTaskDetail() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64 mx-auto rounded bg-muted dark:bg-muted mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="md:col-span-1 space-y-4">
           {/* Actions Card */}
           <Card className="flex items-center justify-end gap-2 p-4">
             <div className="flex items-center justify-between space-x-4 w-full">
                <div className="flex items-center space-x-2 w-full">
                  <Skeleton className="h-10 w-12 rounded bg-muted dark:bg-muted mr-4" />
                  <Skeleton className="h-10 w-36 rounded bg-muted dark:bg-muted" />
                  <Skeleton className="h-10 w-32 rounded bg-muted dark:bg-muted" />
                  <Skeleton className="h-10 w-32 rounded bg-muted dark:bg-muted" />
                </div>
             </div>
           </Card>

           {/* Details Card */}
           <Card className="p-6 space-y-4">
              <Skeleton className="h-4 w-full rounded bg-muted dark:bg-muted mb-3" />
              <div className="flex flex-wrap gap-3 items-center">
                 <Skeleton className="h-6 w-32 rounded-full bg-muted dark:bg-muted" />
                 <Skeleton className="h-6 w-28 rounded-full bg-muted dark:bg-muted" />
                 <Skeleton className="h-6 w-28 rounded-full bg-muted dark:bg-muted" />
              </div>
              <div className="flex items-center justify-between mb-2 mt-4">
                 <Skeleton className="h-6 w-32 rounded bg-muted dark:bg-muted" />
                 <Skeleton className="h-8 w-16 rounded bg-muted dark:bg-muted" />
              </div>
              <ul className="space-y-2">
                 {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="flex items-center gap-3">
                       <Skeleton className="h-8 w-8 rounded-full bg-muted dark:bg-muted" />
                       <div className="space-y-1">
                          <Skeleton className="h-4 w-24 rounded bg-muted dark:bg-muted" />
                          <Skeleton className="h-3 w-32 rounded bg-muted dark:bg-muted" />
                       </div>
                    </li>
                 ))}
              </ul>
           </Card>
        </div>

        {/* Chat / Conversation */}
        <Card className="md:col-span-1 p-6">
           <div className="space-y-4 flex flex-col h-full min-h-[500px]">
              <Skeleton className="flex-1 w-full rounded bg-muted dark:bg-muted" />
              <hr className="my-3 border-gray-200 dark:border-gray-700" />
              <Skeleton className="flex-1 w-full rounded bg-muted dark:bg-muted" />
           </div>
        </Card>
      </div>
    </div>
  );
}

export default SkeletonTaskDetail;
