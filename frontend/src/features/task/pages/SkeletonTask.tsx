// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonTask() {
  return (
    <div className="space-y-4">
      <Card className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
         <div className="flex flex-wrap items-center justify-start gap-2 w-full">
            <Skeleton className="h-10 flex-1 min-w-[220px] rounded bg-muted dark:bg-muted" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-20 rounded bg-muted dark:bg-muted" />
              <Skeleton className="h-9 w-28 rounded bg-muted dark:bg-muted" />
            </div>
         </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-3">
             <div className="flex justify-between items-start">
               <Skeleton className="h-6 w-2/3 rounded bg-muted dark:bg-muted" />
               <Skeleton className="h-5 w-16 rounded-full bg-muted dark:bg-muted" />
             </div>
             <Skeleton className="h-4 w-full rounded bg-muted dark:bg-muted" />
             <div className="flex gap-2 mt-3">
               <Skeleton className="h-5 w-20 rounded-full bg-muted dark:bg-muted" />
               <Skeleton className="h-5 w-24 rounded-full bg-muted dark:bg-muted" />
             </div>
             <div className="flex justify-between items-center mt-4">
               <div className="flex -space-x-2">
                 <Skeleton className="h-7 w-7 rounded-full bg-muted dark:bg-muted border border-white dark:border-gray-800" />
                 <Skeleton className="h-7 w-7 rounded-full bg-muted dark:bg-muted border border-white dark:border-gray-800" />
               </div>
               <Skeleton className="h-8 w-24 rounded bg-muted dark:bg-muted" />
             </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Skeleton className="h-10 w-64 rounded bg-muted dark:bg-muted" />
      </div>
    </div>
  );
}

export default SkeletonTask;
