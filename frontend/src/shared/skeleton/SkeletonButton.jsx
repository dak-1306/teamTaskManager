import React from "react";
import Skeleton from "./Skeleton";

function SkeletonButton({ width = "w-24", height = "h-8", className = "" }) {
  return (
    <Skeleton className={className}>
      <div
        className={`${width} ${height} rounded bg-gray-200 dark:bg-gray-700`}
      />
    </Skeleton>
  );
}

export default SkeletonButton;
