interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);


  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 my-8">
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-200
          ${currentPage === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-blue-600'
          }`}
      >
        ← Назад
      </button>

      
      <div className="flex gap-1 flex-wrap justify-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-200
              ${currentPage === page 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600'
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-200
          ${currentPage === totalPages 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-blue-600'
          }`}
      >
        Вперед →
      </button>
    </div>
  );
};

export default Pagination;