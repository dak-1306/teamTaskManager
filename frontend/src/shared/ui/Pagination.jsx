function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  console.log(
    "Pagination - currentPage:",
    currentPage,
    "totalPages:",
    totalPages,
  );

  return (
    <div className="flex justify-center space-x-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md cursor-pointer ${
            number === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
