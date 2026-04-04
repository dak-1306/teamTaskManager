import Card from "../../../shared/ui/Card";
import SkeletonText from "../../../shared/skeleton/SkeletonText";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";

function SkeletonProjectDetail() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar skeleton (project info) */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700" />
                <div>
                  <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-32 mt-2 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
              <div className="flex flex-col space-y-2 w-28">
                <SkeletonButton width="w-full" height="h-10" />
                <SkeletonButton width="w-full" height="h-10" />
                <SkeletonButton width="w-full" height="h-10" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-3">
              <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
              <SkeletonText lines={3} />
              <div>
                <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                <ul className="list-disc list-inside mt-2 space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>
                      <div className="h-3 w-40 rounded bg-gray-200 dark:bg-gray-700" />
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
                <div className="h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-28 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-10 w-28 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx} className="p-4 space-y-2">
                  <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-700" />
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
