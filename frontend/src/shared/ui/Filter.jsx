function Filter({ onFilterChange, name, options, value }) {
  return (
    <div className="flex items-center space-x-2">
      <select
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={onFilterChange}
        value={value}
      >
        <option value="">Filter by {name}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
