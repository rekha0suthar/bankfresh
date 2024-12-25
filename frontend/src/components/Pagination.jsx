import React, { useContext } from 'react';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import '../styles/services.css';
import { Context } from '../context/Context';

const Pagination = () => {
  const { currentPage, setCurrentPage, totalPages } = useContext(Context);

  // Method to go to next page
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Method to go to previous page
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pagination">
      <span>
        {' '}
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        style={{ color: currentPage === 1 ? '#ccc' : '#000' }}
      >
        <GrPrevious />
      </button>
      <span> {currentPage}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        style={{ color: currentPage === totalPages ? '#ccc' : '#000' }}
      >
        <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
