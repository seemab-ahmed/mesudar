


import React from "react";
import { Link } from "react-router-dom";
import bannerimage from "../Images/bannerImage.jpg";

const Hero = () => {
  return (
    <div className="bg-white md:pt-[150px] pt-[100px] md:pb-16 pb-10 px-5 m-auto max-w-[1080px] xl:max-w-[1300px] overflow-hidden relative">
    <div className="flex flex-col md:flex-row items-center gap-12">
      {/* Left Content */}
      <div className="md:w-1/2 w-full flex flex-col gap-6 text-left z-20">
        <p className="uppercase text-sm tracking-widest text-[#13AE8D] font-semibold">
          Mesudar.com is a free tool
        </p>
        <h1 className="text-[30px] leading-9 lg:text-6xl font-bold text-gray-900 lg:leading-[70px] pb-3">
          Running a <span className="text-[#13AE8D] ">shul comes</span> with
        <span className="text-[#13AE8D] "> countless </span>responsibilities
        </h1>

        <div> 
          <div className="max-w-28 h-2 rounded-full bg-[#13AE8D]"></div>
        </div>

        <p className="text-gray-600 text-base leading-6 max-w-md">
             Mesudar.com is a free tool that makes it easy for Gabboim to create
            customized checklists for every task — from Shabbos prep and
            cleaning checklists to Yom Tov management.
        </p>
        <div className="relative group w-fit flex items-center overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-0 h-full bg-black z-10 group-hover:w-full transition-all duration-500 ease-in-out"></div>
            <button
              className="relative z-20 w-fit bg-[#13AE8D] group-hover:bg-transparent text-white rounded-full px-8 py-4 text-lg transition-all duration-300"
            >
                READ MORE
            </button>
          </div>
    
      </div>
  
      {/* Right Image */}
      <div className= "w-[85%] md:w-1/2  md:m-0 ml-auto relative z-10">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className=" bg-gray-200 md:p-7 p-3 rounded-[999px]  overflow-hidden z-20">
            <img
              src={bannerimage}
              alt="Hero"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Decorative Background Shape */}
          <div className="absolute top-[50px] md:left-[-130px] left-[-50px] w-full md:max-w-[350px] max-w-[200px] md:h-[40px] h-[30px]  bg-gray-200 rounded-full z-0"></div>
          <div className="absolute md:top-[110px] top-[100px] md:left-[-50px] left-[-30px]  w-full md:max-w-[150px]  max-w-[120px]  md:h-[40px] h-[30px]  bg-gray-200 rounded-full z-0"></div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Hero;














// import React from "react";
// import { Link } from "react-router-dom";
// import bannerimage from "../Images/bannerImage (2).png";

// const Hero = () => {
//   return (
//     <div className="bg-white pt-16 md:pb-12  px-5 m-auto max-w-[1080px] 2xl:max-w-[1440px]">
//       <div className="flex flex-col-reverse md:flex-row items-center gap-12">
//         {/* Text Section */}
//         <div className="md:w-1/2 w-full space-y-6 text-left">
//           <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
//             Running a <span className="text-[#13AE8D]">shul comes</span> with
//             <span className="text-[#13AE8D]"> countless </span>responsibilities
//           </h1>
//           <p className="text-gray-600 text-base leading-6 max-w-md">
//             Mesudar.com is a free tool that makes it easy for Gabboim to create
//             customized checklists for every task — from Shabbos prep and
//             cleaning checklists to Yom Tov management.
//           </p>
//           <div className="flex gap-4 flex-wrap">
//             <Link
//               to="/"
//               className="bg-[#13AE8D] text-white text-sm px-6 py-3 rounded-full font-semibold shadow hover:bg-teal-400 transition-all duration-300"
//             >
//               Start Today
//             </Link>
//           </div>
//         </div>

//         {/* Image Section */}
//         <div className="md:w-1/2 w-full rounded-br-[70px] rounded-t-[70px] rounded-tr-[20px] rounded-l-[20px] overflow-hidden">
//           <img
//             src={bannerimage}
//             alt="Hero Banner"
//             className="w-full h-auto rounded-xl shadow-md"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
