function SearchBar({ placeholder, onChange, onSubmit, value }) {
  return (
    <form
      method="GET"
      className="flex justify-between items-center flex-1"
      onSubmit={onSubmit}
    >
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        className=" px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
        onChange={onChange}
      />
    </form>
  );
}

export default SearchBar;
