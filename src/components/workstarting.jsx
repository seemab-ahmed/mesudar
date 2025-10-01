
import React from 'react';
import bannerimage from "../Images/cta-img.png";
const Workstarting = () => {
  return (
    <div className="max-w-[1080px] xl:max-w-[1300px] m-auto px-5 md:pt-0 pt-[30px]  relative w-full bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 flex  justify-around  gap-4 items-center shadow-lg flex-col md:flex-row rounded-3xl">
      {/* Background blurred shapes (optional) */}
      <div className="absolute top-0 left-0 w-10 h-10 bg-purple-300 rounded-full blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-4 right-10 w-6 h-6 bg-purple-500 rounded-full blur-xl opacity-50"></div>

      {/* Text content */}
      <div className="max-w-xl z-10 flex flex-col gap-5 pt-3">
        <p className="text-[16px] leading-[22px]  md:text-[20px] md:leading-[26px] text-[#000]">
            Are You Ready For
        </p>
        <h2 className="text-[30px] leading-[36px]  md:text-[45px]  md:leading-[51px] text-[#13AE8D] font-medium ">
          Get starting work <span className='text-[#000]'>with Starup today.</span>
        </h2>
        <div className="relative group w-fit flex items-center overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-0 h-full bg-black z-10 group-hover:w-full transition-all duration-500 ease-in-out"></div>
            <button
              className="relative z-20 w-fit bg-[#13AE8D] group-hover:bg-transparent text-white rounded-full px-8 py-4 text-lg transition-all duration-500 ease-in-out"
            >
              let's go
            </button>
        </div>

      </div>

      <div className="md:mt-[-50px] mt-0">
         <img
              src={bannerimage}
              alt="Hero"
              className="w-full h-full object-cover "
            />
      </div>
    </div>
  );
};

export default Workstarting;














// // HeroSection.jsx
// import React from 'react';

// const Workstarting = () => {
//   return (
//     <div className=" max-w-[1040px] 2xl:max-w-[1400px]  m-auto px-5 py-[60px] relative w-full bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-br-[70px] rounded-t-[70px] rounded-tr-[20px] rounded-l-[20px] flex flex-wrap justify-between  gap-4 items-center shadow-lg overflow-hidden">
//       {/* Background blurred shapes (optional) */}
//       <div className="absolute top-0 left-0 w-10 h-10 bg-purple-300 rounded-full blur-xl opacity-70 animate-pulse"></div>
//       <div className="absolute top-4 right-10 w-6 h-6 bg-purple-500 rounded-full blur-xl opacity-50"></div>

//       {/* Text content */}
//       <div className="max-w-xl z-10">
//         <h2 className="text-[30px] leading-[36px]  md:text-[45px]  md:leading-[51px] text-[#13AE8D] font-semibold  mb-6">
//           Get starting work <span className='text-[#000]'>with Starup today.</span>
//         </h2>
//         <p className="text-[16px] leading-[22px]  md:text-[20px] md:leading-[26px] text-[#000]">
//           A reviewer is not connected to the host company to prevent bias in the reviewing process.
//         </p>
//       </div>

//       {/* Button */}
//       <div className="mt-6 md:mt-0 z-10">
//         <button className="bg-[#13AE8D] hover:bg-[] text-white px-[25px] py-4  rounded-full text-sm font-medium shadow">
//           Create your profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Workstarting;
