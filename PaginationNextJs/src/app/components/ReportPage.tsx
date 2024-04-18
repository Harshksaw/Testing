import React from "react";
import { FaFilter } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import {dataDummy} from '../../../public/data'
import Pagination from "./Pagination";


const ReportPage = () => {
  return (
    <main className="grid grid-cols-1 gap-5 h-screen w-full ">

      <div className="h-10 w-full flex flex-row justify-between align-items mt-20  line-clamp-1 border-black border-x-1">
        <h1 className="text-center ml-[30%] text-1xl font-bold">
          Recently Generated Reports
        </h1>
        <div className="flex flex-row mr-5 gap-5">
          <FaFilter />
          <ImCross />
        </div>
      </div>

      <div className="flex justify-center items-center mt-10 flex-col ">
     
       
          {/* {dataDummy.map((item, index) => (
            <tr key={index} className="p-5">
              <td style={{ width: "20%" }} className="px-5 py-5">{item.date}</td>
              <td style={{ flex: 2, wordBreak: "break-word" }}>{item.title}</td>
              <td style={{ width: "30%"}} className="text-center">
                <a href={item.downloadLink} download >
                  Download
                </a>
              </td>
            </tr>
          ))} */}

            <Pagination  data={dataDummy} itemsPerPage={5}/>

        


    
    </div>

    </main>
  );
};

export default ReportPage;
