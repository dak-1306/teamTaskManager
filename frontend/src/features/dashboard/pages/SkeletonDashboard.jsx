import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full" />
                <div className="mt-2">
                  <div className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts: main line chart + pie/status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4 lg:col-span-2">
          <Skeleton className="h-4 w-full" />
          <div className="mt-4">
            <div className="h-64 w-full rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </Card>

        <Card className="p-4">
          <Skeleton className="h-4 w-full" />
          <div className="mt-4 flex items-center justify-center">
            <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-40 h-40" />
          </div>
        </Card>
      </div>

      {/* Recent projects */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="p-4">
              <Skeleton className="h-4 w-full" />
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* My tasks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="mb-4 p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full" />
                  <div className="mt-3 flex items-center justify-between">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkeletonDashboard;
