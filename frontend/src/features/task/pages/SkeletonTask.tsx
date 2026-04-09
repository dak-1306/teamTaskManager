// @ts-nocheck
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonTask() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 rounded" />
          <Skeleton className="h-3 w-48 mt-2 rounded" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-40 rounded" />
          <Skeleton className="h-10 w-28 rounded" />
          <Skeleton className="h-10 w-28 rounded" />
        </div>
      </div>

      <Card>
        <Skeleton className="h-10 rounded" />
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card key={idx} className="space-y-3 p-4">
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-5 w-16 rounded" />
              </div>
              <Skeleton className="h-8 w-20 rounded" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SkeletonTask;
