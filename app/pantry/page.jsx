import React from "react";
import Session from "./session";
import Table from "./table";
import User from "./user";

const Pantry = () => {
  return (
    <div className="bg-[url('../public/food.png')] h-screen  bg-cover ">
      <div className=" bg-black bg-opacity-50 h-screen bg-cover">
        <div className="flex justify-center items-center pt-12">
          <h2 className="backdrop-blur-sm bg-white/50  border-[#fce4e4]  rounded-full  font-semibold text-dark  text-3xl  p-3">
            Your Pantry
          </h2>
        </div>
        <div>
          <Session />
        </div>
      </div>
    </div>
  );
};
export default Pantry;
