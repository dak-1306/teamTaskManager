function Input({ label, type = "text", placeHolder, id, ref, defaultValue }) {
  return (
    <div className="mb-4">
      {label && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        ref={ref}
      />
    </div>
  );
}
export default Input;
