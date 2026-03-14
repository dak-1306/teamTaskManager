function Card({
  title,
  description,
  children,
  className,
  animation = false,
  ...rest
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md rounded p-4 space-y-2 ${animation ? "hover:shadow-lg dark:hover:shadow-gray-600  transition duration-300  hover:scale-[102%]" : ""} ${className || ""}`}
      {...rest}
    >
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {description && (
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      )}
      {children}
    </div>
  );
}
export default Card;
