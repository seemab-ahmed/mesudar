import React from "react";
import { Link } from "react-router-dom";
import bannerimage from "../Images/bannerImage (2).png";

const Hero = () => {
  return (
    <div className="bg-white pt-16 md:pb-12  px-5 m-auto max-w-[1080px] 2xl:max-w-[1440px]">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text Section */}
        <div className="md:w-1/2 w-full space-y-6 text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Running a <span className="text-[#13AE8D]">shul comes</span> with
            <span className="text-[#13AE8D]"> countless </span>responsibilities
          </h1>
          <p className="text-gray-600 text-base leading-6 max-w-md">
            Mesudar.com is a free tool that makes it easy for Gabboim to create
            customized checklists for every task — from Shabbos prep and
            cleaning checklists to Yom Tov management.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/"
              className="bg-[#13AE8D] text-white text-sm px-6 py-3 rounded-full font-semibold shadow hover:bg-teal-400 transition-all duration-300"
            >
              Start Today
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 w-full rounded-br-[70px] rounded-t-[70px] rounded-tr-[20px] rounded-l-[20px] overflow-hidden">
          <img
            src={bannerimage}
            alt="Hero Banner"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
