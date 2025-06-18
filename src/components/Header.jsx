import React, { useState } from "react";
import Button from "./ui/buttons/Button";
import { burger, logo } from "../assets";
import { Link } from "react-router-dom";
import Logo from "../Images/logo.png"
const navLinks = ["Admin", "SignUp"  ];

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className=" w-full  bg-white border-b border-[#535252] md:py-5">
      <div className="max-w-[1080px] xl:max-w-[1300px]   m-auto px-5 ">
        <nav className="w-full  flex justify-between items-center relative">
          <div className="logo text-[30px] font-bold text-[#1f7333] m-auto">
           <Link to="/" className="flex items-center">
             {/* <span className="bg-[#1f7333] lg:w-[40px] w-[24px] lg:h-[40px] h-[24px] p-1 rounded-[4px] flex justify-center items-center text-white lg:text-2xl text-xl">✔</span> mesdur.com */}
             <img src={Logo} alt="logo" className="h-[80px] sm:h-[100px]  m-auto" />
             </Link>
          </div>
          {/* <div
            className={`grid transition-[grid-template-rows] duration-500 ease-in-out overflow-hidden max-lg:gap-4 max-lg:items-start max-lg:w-full max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:bg-white max-lg:shadow-sm max-lg:flex-col z-30 
            ${
              isExpanded ? "grid-rows-[1fr] max-lg:pb-2" : "grid-rows-[0fr]"
            } lg:grid-rows-[1fr]`}
          >
            <div className="overflow-hidden flex flex-col lg:flex-row items-center gap-6 lg:gap-12  ">
              {navLinks.map((nav, index) => (
                <a
                  key={index}
                  href="/admin"
                  className="relative font-semibold text-base text-dark-navy transition hover:text-[#13AE8D] cursor-pointer after:mx-auto after:block after:h-[1px] after:w-0 after:bg-[#13AE8D] after:transition-all hover:after:w-8 after:mt-2 after:absolute after:bottom-0 after:left-0 after:right-0 max-sm:pb-1 max-xl:text-sm"
                >
                  {nav}
                </a>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="lg:hidden flex flex-col items-end"
            onClick={() => setIsExpanded(!isExpanded)}
          >
                <div className="w-7 h-1 bg-[#13AE8D] mb-1 rounded-lg"></div>
                <div className="w-9 h-1 bg-[#13AE8D] mb-1 rounded-lg"></div>
                <div className="w-7 h-1 bg-[#13AE8D] rounded-lg"></div>
          </button> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
