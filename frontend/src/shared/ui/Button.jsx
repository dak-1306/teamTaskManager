function Button({
  children,
  onClick,
  className,
  variant,
  size,
  icon,
  type = "button",
}) {
  const baseClasses = "px-4 py-2 rounded focus:outline-none";
  const variantClasses = {
    primary: "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800",

    secondary:
      "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500",

    outline:
      "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",

    danger: "bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800",

    ghost: "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
  };
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };
  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.medium} ${className}`;
  return (
    <button onClick={onClick} className={combinedClasses} type={type}>
      {icon && (
        <span className="flex items-center">
          {icon} {children}
        </span>
      )}
      {!icon && children}
    </button>
  );
}
export default Button;
