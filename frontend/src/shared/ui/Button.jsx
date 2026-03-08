function Button({
  children,
  onClick,
  className,
  variant,
  size,
  type = "button",
}) {
  const baseClasses = "px-4 py-2 rounded focus:outline-none";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",

    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",

    danger: "bg-red-600 text-white hover:bg-red-700",

    ghost: "text-gray-700 hover:bg-gray-100",
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
