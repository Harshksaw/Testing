import React from "react";
import { FaFilter } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { DummyData } from "../../../public/data";
import Pagination from "./Pagination";

const ReportPage = () => {
  return (
    <div
      className=" flex flex-col 
      max-w-4xl mx-auto rounded-md
       border-black border-x-1  shadow-lg  h-full bg-white"
    >
      
      <div className="flex justify-end w-full  h-20 items-center ">
        <h1 className="mr-[30%]  text-1xl font-bold ">
          Recently Generated Reports
        </h1>
        <div className="flex   flex-row mr-5 gap-5">
          <FaFilter />
          <ImCross />
        </div>
      </div>

      <Pagination data={DummyData} />
    </div>
  );
};

export default ReportPage;
