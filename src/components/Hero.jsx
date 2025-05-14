import React from "react";
import { Link } from "react-router-dom";
import bannerimage from "../Images/bannerright.webp";
const Hero = () => {
  return (
    <div className="bg-white pt-[40px]  pb-2 m-auto max-w-[1080px] 2xl:max-w-[1440px]  px-5">
      <div className="flex md:flex-row flex-col gap-10 items-center ">
        {/* Text Section */}
        <div className="space-y-6 w-full   md:max-w-[50%] relative z-10">
          <h1 className=" lg:text-5xl text-3xl lg:leading-[50px] leading-[45px] mb-3   text-[#000] font-bold ">
             Running a <span className="text-[#13AE8D]">shul comes</span>  with<span className="text-[#13AE8D]"> countless </span>responsibilities
          </h1>
          <p className=" max-w-full 2xl:max-w-full md:max-w-[498px] text-base leading-6 mb-3 font-normal   text-[#707070]">
          Mesudar.com is a free tool that makes it easy for Gabboim to create customized checklists for every task — from Shabbos prep and cleaning checklists to Yom Tov management.
          </p>
          <div className="flex gap-3 flex-wrap mb-9">
            <Link to="/" className="  border border-[#13AE8D] text-sm leading-5 font-medium px-4 py-2 rounded-[8px] text-[#1E1E1E] hover:text-[#FFFFFF] hover:bg-[#13AE8D] transition-all ease-in-out duration-500">Start Today</Link>
          </div>
        </div>

        {/* Image/Icons Section */}
        <div className="w-full md:max-w-[50%] rounded-lg overflow-hidden">
           <img src={bannerimage} alt="Banner" className="w-full h-auto " />
        </div>
      </div>
    </div>
  );
};

export default Hero;
