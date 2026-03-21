import React from "react";
import Skeleton from "./Skeleton";

function SkeletonText({ lines = 3, className = "" }) {
  const arr = Array.from({ length: lines });
  return (
    <Skeleton className={className}>
      <div className="space-y-2">
        {arr.map((_, i) => (
          <div
            key={i}
            className={`h-3 rounded bg-gray-200 dark:bg-gray-700 w-full ${i === lines - 1 ? "w-3/4" : ""}`}
          />
        ))}
      </div>
    </Skeleton>
  );
}

export default SkeletonText;
