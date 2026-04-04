import Card from "../../../shared/ui/Card";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";
import SkeletonAvatar from "../../../shared/skeleton/SkeletonAvatar";

function SkeletonTask() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-48 mt-2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-10 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-28 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-28 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      <Card>
        <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card key={idx} className="space-y-3 p-4">
            <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SkeletonTask;
