import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonProfile() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="space-y-6">
        <Card className="space-y-4">
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-8">
              <div className="w-40 h-40 rounded-full overflow-hidden">
                <Skeleton className="w-full h-full rounded-full bg-muted/80" />
              </div>

              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-48 rounded bg-muted/70" />
                <Skeleton className="h-4 w-3/4 rounded bg-muted/60" />
              </div>
            </div>

            <div className="flex space-x-2">
              <Skeleton className="w-28 h-10 rounded bg-muted/70" />
              <Skeleton className="w-28 h-10 rounded bg-muted/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-x-4">
          <CardContent className="flex space-x-4">
            <Skeleton className="w-48 h-10 rounded bg-muted/70" />
            <Skeleton className="w-36 h-10 rounded bg-muted/70" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4">
            <Skeleton className="h-4 w-12 rounded bg-muted/70" />
            <Skeleton className="h-4 w-20 rounded bg-muted/70" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SkeletonProfile;
