import React from "react";
import Skeleton from "./Skeleton";

function SkeletonAvatar({ size = 10, className = "" }) {
  const px = typeof size === "number" ? `w-${size} h-${size}` : size;
  // fallback sizes using inline style for arbitrary sizes
  const style = typeof size === "number" ? {} : {};
  return (
    <Skeleton className={className}>
      <div
        className={`rounded-full bg-gray-200 dark:bg-gray-700 ${px}`}
        style={style}
      />
    </Skeleton>
  );
}

export default SkeletonAvatar;
