


import React from "react";
import { Link } from "react-router-dom";
import bannerimage from "../Images/learnmore.jpg";

const Learnmore = () => {
  return (
    <div className="bg-white py-10 md:py-16 px-5 m-auto max-w-[1080px] xl:max-w-[1300px] overflow-hidden relative">
    <div className="flex flex-col md:flex-row items-center gap-12">
      {/* Left Content */}
     
      <div className= "md:w-1/2  md:m-0 ml-auto relative z-10">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className=" rounded-xl  overflow-hidden z-20 w-[93%]">
            <img
              src={bannerimage}
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-[-10px]  w-full h-full  rounded-xl bg-gray-200  z-0"></div>
        </div>
      </div>
  
      {/* Right Image */}
      
      <div className="md:w-1/2 w-full flex flex-col gap-6 text-left z-20">
        <p className="uppercase text-sm tracking-widest text-[#13AE8D] font-semibold">Learn More</p>
        <h1 className="text-[30px] leading-9 lg:text-6xl font-medium text-gray-900 lg:leading-[70px] pb-3">
           learn more about our
        <span className="text-[#13AE8D] "> missions </span>
        </h1>
        
        <div> 
          <div className="max-w-28 h-2 rounded-full bg-[#13AE8D]"></div>
        </div>

        <p className="text-gray-600 text-base leading-6">
         Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.Separated they live in Bookmarksgrove
        </p>
        <div className="relative group w-fit flex items-center overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-0 h-full bg-black z-10 group-hover:w-full transition-all duration-500 ease-in-out"></div>
            <button
              className="relative z-20 w-fit bg-gradient-to-br from-green-400 to-teal-400  group-hover:bg-transparent text-white rounded-full px-8 py-4 text-lg transition-all duration-300"
            >
                READ MORE
            </button>
          </div>
    
      </div>
    </div>
  </div>
  
  );
};

export default Learnmore;

