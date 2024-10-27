import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import Category from "./Category";
import { TherapyCards } from "./TherapyCards";
import PaginationButtons from "@/components/ui/pagnationButton";


const Therapy = () => {
  return (
    <div style={{ backgroundColor: "#F5F5DC" }}>
      {" "}
      <div className="">
        {/* arrow to go back */}
        <div>
          <a href="#">
            <IoArrowBackSharp className=" mt-10 w-[30px] h-[20px] text-pink-500" />
          </a>
        </div>

        {/* drop downs */}
        <div>
          <Category />
        </div>

        {/* after dropdown */}
        <div className="text-center py-2 px-4 font-semibold text-[14px] mt-4 bg-white mx-2 border rounded-md">
          <p>4 Providers Found for Individual Therapy </p>
        </div>

        {/* therapy cards */}
        <div>
            <TherapyCards />
            <TherapyCards />
            <TherapyCards />
            <TherapyCards />
        </div>

        {/* next buttons */}
        <div className="flex items-center justify-between p-4">
            <div className=" mb-2">
                <PaginationButtons />
            </div>

            {/* dropdown */}
            <div className="flex items-center justify-center gap-2 font-semibold text-md">
                <select className="py-2 px-4 border-2 border-blue-400 rounded-md">
                    <option>4</option>
                </select>
                <p>Providers</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Therapy;
