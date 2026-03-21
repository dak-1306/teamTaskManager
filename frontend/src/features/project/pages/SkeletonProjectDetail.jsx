import Card from "../../../shared/ui/Card";
import SkeletonText from "../../../shared/skeleton/SkeletonText";
import SkeletonButton from "../../../shared/skeleton/SkeletonButton";

function SkeletonProjectDetail() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute top-0 left-0">
          <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          <div className="mx-auto h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
        </h1>
      </div>

      <Card>
        <div className="flex justify-between mx-auto max-w-2xl">
          <div className="space-y-3 w-2/3">
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
            <SkeletonText lines={3} />
            <div>
              <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
              <ul className="list-disc list-inside mt-2 space-y-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li key={i}>
                    <div className="h-3 w-48 rounded bg-gray-200 dark:bg-gray-700" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col space-y-3 w-1/4">
            <SkeletonButton width="w-full" height="h-10" />
            <SkeletonButton width="w-full" height="h-10" />
            <SkeletonButton width="w-full" height="h-10" />
          </div>
        </div>
      </Card>

      <hr className="my-4 border-gray-300 dark:border-gray-600" />
    </div>
  );
}

export default SkeletonProjectDetail;
