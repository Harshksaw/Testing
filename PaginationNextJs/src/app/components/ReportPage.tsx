import React from "react";
import { FaFilter } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const ReportPage = () => {
  return (
    <main className="flex flex-col h-full w-full ">

      <div className="h-10 w-full flex flex-row justify-between align-items mt-20  line-clamp-1 border-black border-x-1">
        <h1 className="text-center ml-[40%] text-1xl font-bold">
          Recently Generated Reports
        </h1>
        <div className="flex flex-row mr-10 gap-10">
          <FaFilter />
          <ImCross />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>{/* Add table rows here */}</tbody>
        </table>
      </div>

    </main>
  );
};

export default ReportPage;
