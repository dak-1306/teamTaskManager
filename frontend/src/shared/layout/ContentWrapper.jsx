import React from "react";

function ContentWrapper({ children, fullScreen = false, className = "" }) {
  const base = fullScreen
    ? "w-full h-[calc(100vh-8rem)]"
    : "w-full max-w-6xl mx-auto mt-8 space-y-8";

  return <div className={`${base} ${className}`}>{children}</div>;
}

export default ContentWrapper;
