"use client";

import React, { useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface Props {
  data: {
    date: string;
    title: string;
    downloadLink: string;
  }[];

}

const Pagination = ({ data }: Props) => {

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage : number) => {
    setCurrentPage(newPage);

  };



  // Prev , Next , Page Numbers-->>>>
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = data.slice(startIndex, endIndex);


  let maxButtons = 6;
  if (currentPage > 1) {
    maxButtons = 5;
  }

  const pageNumbers = Array.from(
    { length: totalPages },
    ( _ , index) => index + 1
  );

  //Page numbers that are available to be displayed, after calculating the start and end index!!!
  const visiblePageNumbers = pageNumbers.slice(
    Math.max(0, currentPage - Math.floor(maxButtons / 2)),
    Math.min(totalPages, currentPage + Math.floor(maxButtons / 2) + 1)
  );


  return (
    <main className="w-full   min-w-[500px] h-full pt-10 space-y-10    flex   flex-col justify-between ">
      <table className="border   w-full min-w-[500px]   " style={{appearance: 'none', outline: 'none', border: 'none'}}>
        <thead  className="">
          <tr className="bg-slate-300  ">
            <th style={{ width: "20%" , padding: "7px", fontWeight:"500" }}>Date</th>
            <th style={{ flex: 2, wordBreak: "break-word",  fontWeight:"500" }}>Title</th>
            <th style={{ width: "20%", fontWeight:"500" }}>Download</th>
          </tr>
        </thead>

        <tbody className="no-appearance no-outline no-border">
          {displayedItems.map((item, index) => (
            <tr key={index} className="text-center">
              <td style={{ width: "20%" }} className="px-5 py-5">
                {item.date}
              </td>
              <td style={{ flex: 3 }}>{item.title}</td>
              <td style={{ width: "20%" }} className="text-center ">
                <a href={item.downloadLink} download>
                <FaFileDownload  className="ml-16"/>
                </a>
              </td>
            </tr>
          ))}
        </tbody>


      </table>

      <section className="flex flex-row justify-center items-center gap-10  border-t-2 py-4 ">
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex flex-row items-center gap-1 text-sm"
          >
            <MdKeyboardDoubleArrowLeft />
            Prev
          </button>

          
          {/* cureent */}
          <div>
          {visiblePageNumbers.map((pageNumber) => (
            <button
              className={`border  rounded-md m-1 h-8 w-8 text-center  ${currentPage === pageNumber ? "bg-orange-500 text-white" : "bg-white"}`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={currentPage === pageNumber}
            >
              {pageNumber}
            </button>
          ))}
          </div>

          {/* //next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex flex-row items-center gap-1 text-sm"
          >
            Next
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>

        <aside className=" flex justify-center items-center gap-4 text-sm">
          <p>Rows Per page</p>
          <select
            title="Rows Per Page"
            // style={{  outline: "none", border: "none" }}
            className="rounded-md  bg-slate-100 h-8 px-2 border border-black "
            onChange={(e) =>  setItemsPerPage(Number(e.target.value))}
            defaultValue={itemsPerPage}
          >


            <option value="2" >2</option>
            <option value="3" >3</option>
            <option value="5" >5</option>
            <option value="7">7</option>



           
          </select>
        </aside>
      </section>
    </main>
  );
};

export default Pagination;
