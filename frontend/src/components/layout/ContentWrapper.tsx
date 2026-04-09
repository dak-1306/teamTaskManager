type ContentWrapperProps = {
  children: React.ReactNode;
  fullScreen?: boolean;
  className?: string;
};

function ContentWrapper({
  children,
  fullScreen = false,
  className = "",
}: ContentWrapperProps) {
  const base = fullScreen
    ? "w-full h-[calc(100vh-8rem)]"
    : "w-full max-w-7xl mx-auto mt-8 space-y-8";

  return <div className={`${base} ${className}`}>{children}</div>;
}

export default ContentWrapper;
