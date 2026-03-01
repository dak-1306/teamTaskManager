function Button({
  children,
  onClick,
  className,
  variant,
  size,
  type = "button",
}) {
  const baseClasses = "text-white px-4 py-2 rounded focus:outline-none";
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-500 hover:bg-red-600",
  };
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };
  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.medium} ${className}`;
  return (
    <button onClick={onClick} className={combinedClasses} type={type}>
      {children}
    </button>
  );
}
export default Button;
