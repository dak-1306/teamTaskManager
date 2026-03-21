import Card from "../../../shared/ui/Card";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";
import SkeletonAvatar from "../../../shared/skeleton/SkeletonAvatar";

function SkeletonTask() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
        <div className="mx-auto h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
      </h1>

      <Card>
        <div className="flex items-center justify-start space-x-2">
          <div className="flex-1">
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="w-28">
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="w-28">
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <SkeletonButton width="w-36" height="h-10" />
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card key={idx} className="space-y-2 p-4">
            <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
            <div>
              <h3 className="font-semibold">Assignees:</h3>
              <ul className="list-none space-y-1 mt-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <SkeletonAvatar size={8} />
                    <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end mt-2">
              <SkeletonButton width="w-24" height="h-8" />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <div className="h-10 w-64 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export default SkeletonTask;
