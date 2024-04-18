
'use client';

import React, { useState } from 'react';

const Pagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = data.slice(startIndex, endIndex);

  // Determine the number of buttons to display
  let maxButtons = 5;
  if (currentPage > 1) {
    maxButtons = 6;
  }


  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Slice the page numbers based on maxButtons
  const visiblePageNumbers = pageNumbers.slice(
    Math.max(0, currentPage - Math.floor(maxButtons / 2)),
    Math.min(totalPages, currentPage + Math.floor(maxButtons / 2) + 1)
  );

  return (
    <div>
    
      <table className="border border-black w-[80%] min-w-[500px]  overflow-x-scroll  overflow-y-scroll ">
        <thead>
          <tr className="">
            <th style={{ width: "20%" }}>Date</th>
            <th style={{ flex: 2, wordBreak: "break-word" }}>Title</th>
            <th style={{ width: "30%" }}>Download</th>

          </tr>
        </thead>
      <tbody className=" bg-blue-100">
        {displayedItems.map((item, index) => (

          <tr key={index} className=" ">
            <td style={{ width: "20%" }} className="px-5 py-5">
              {item.date}
            </td>
            <td style={{ flex: 2}}>{item.title}</td>
            <td style={{ width: "30%" }} className="text-center">
              <a href={item.downloadLink} download>
                Download
              </a>
            </td>
          </tr>
        ))}
      </tbody>
      </table>

    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {/* cureent */}
      {visiblePageNumbers.map((pageNumber) => (
        <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md py-5 px-5 mx-5'
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}

      {/* //next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

    </div>
    </div>
  );
};

export default Pagination;
