import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

const ResultsTable = ({ data, error, headings, initialRowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  if (error) {
    return (
      <div className="p-6 flex items-center text-red-500">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No data available to display.</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Calculate current page data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageData = data.slice(startIndex, startIndex + rowsPerPage);

  // Handle pagination navigation
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when rows per page change
  };

  return (
    <div className="relative">
      {/* Table Container */}
      <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {headings.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPageData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-100 transition-colors">
                {columns.map((column) => (
                  <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {typeof row[column] === 'object' && row[column] !== null
                      ? JSON.stringify(row[column]) // Handle objects
                      : row[column] || 'N/A'} {/* Handle null or undefined */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <label htmlFor="rowsPerPage" className="text-sm text-gray-700 mr-2">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-700">
            Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
          </p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;