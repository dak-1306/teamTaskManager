function Input({
  label,
  type = "text",
  placeHolder,
  id,
  ref,
  defaultValue,
  classNameInput,
  children,
}) {
  return (
    <div className={`mb-4`}>
      {label && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      {children ? (
        <div
          className={`flex justify-between items-center space-x-2 ${classNameInput}`}
        >
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id={id}
            type={type}
            placeholder={placeHolder}
            defaultValue={defaultValue}
            ref={ref}
          />
          <span>{children}</span>
        </div>
      ) : (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          type={type}
          placeholder={placeHolder}
          defaultValue={defaultValue}
          ref={ref}
        />
      )}
    </div>
  );
}
export default Input;
