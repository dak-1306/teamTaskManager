// @ts-nocheck
import React from "react";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonProjectList() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center">My Projects</h1>

      {/* Top controls: search + filters + create */}
      <Card>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Skeleton className="h-10 rounded bg-muted" />
          </div>
          <div className="w-32">
            <Skeleton className="h-10 rounded bg-muted" />
          </div>
          <div className="w-32">
            <Skeleton className="h-10 rounded bg-muted" />
          </div>
          <Skeleton className="w-44 h-10 rounded bg-muted" />
        </div>
      </Card>

      {/* Owned projects grid */}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <li key={idx}>
            <Card className="p-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4 rounded bg-muted" />
                <Skeleton className="h-4 w-full rounded bg-muted" />
                <div className="flex justify-end mt-2">
                  <Skeleton className="w-24 h-8 rounded bg-muted" />
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <h2 className="text-xl font-semibold text-center">
        Projects I'm a Member Of
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <li key={idx}>
            <Card className="p-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4 rounded bg-muted" />
                <Skeleton className="h-4 w-full rounded bg-muted" />
                <div className="flex justify-end mt-2">
                  <Skeleton className="w-24 h-8 rounded bg-muted" />
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkeletonProjectList;
