function Card({ title, description, children, ...rest }) {
  return (
    <div
      className={`bg-white shadow-md rounded p-4 space-y-2 ${rest.className || ""}`}
      {...rest}
    >
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {description && <p className="text-gray-600">{description}</p>}
      {children}
    </div>
  );
}
export default Card;
