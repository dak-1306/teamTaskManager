import Card from "../../../shared/ui/Card";
import SkeletonText from "../../../shared/skeleton/SkeletonText";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";
import SkeletonAvatar from "../../../shared/skeleton/SkeletonAvatar";

function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="p-4">
            <div className="flex items-center space-x-4">
              <SkeletonAvatar size={12} />
              <div className="flex-1">
                <SkeletonText lines={2} />
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
          <SkeletonText lines={1} />
          <div className="mt-4">
            <div className="h-64 w-full rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </Card>

        <Card className="p-4">
          <SkeletonText lines={1} />
          <div className="mt-4 flex items-center justify-center">
            <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-40 h-40" />
          </div>
        </Card>
      </div>

      {/* Recent projects */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <SkeletonText lines={1} />
          <SkeletonButton width="w-28" height="h-8" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="p-4">
              <SkeletonText lines={2} />
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <SkeletonButton width="w-28" height="h-8" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* My tasks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <SkeletonText lines={1} />
          <SkeletonButton width="w-20" height="h-8" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="mb-4 p-4">
              <div className="flex items-center space-x-4">
                <SkeletonAvatar size={12} />
                <div className="flex-1">
                  <SkeletonText lines={2} />
                  <div className="mt-3 flex items-center justify-between">
                    <SkeletonText lines={1} />
                    <SkeletonButton width="w-20" height="h-8" />
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
