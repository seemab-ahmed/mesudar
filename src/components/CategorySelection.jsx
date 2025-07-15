


// export const CategorySelection = ({ categories, categoryObjects, onSelect, onBack }) => {
//   return (
//     <div className=" p-6">
//       {/* Header with animated gradient */}
//       <div className="text-center mb-12 animate-fade-in">
//         <h1 className="text-5xl font-bold bg-clip-text text-[#000] mb-2">
//           mesudar.com
//         </h1>
//         <p className="text-xl text-gray-600 font-light">Simplifying Gabboim's daily life</p>
//       </div>

//       {/* Floating category title */}
//       <div className="flex justify-center mb-16">
//         <div className="relative">
//           <div className="relative bg-[#13AE8D] backdrop-blur-sm text-[#fff] rounded-full py-4 px-10 shadow-lg border border-white/20">
//             <p className="text-xl font-medium">Select a category</p>
//           </div>
//         </div>
//       </div>

//       {/* Modern card grid with hover effects */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {categoryObjects.map((category) => (
//           <button
//             key={category._id}
//             onClick={() => onSelect(category)}
//             className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 border border-white/30 hover:border-[#13AE8D]/30"
//           >
//             {/* Animated background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-white to-[#f0fdf4] group-hover:from-[#13AE8D]/10 group-hover:to-[#057857]/10 transition-all duration-500"></div>
            
//             {/* Content */}
//             <div className="relative z-10 p-8 flex flex-col items-center">
//               <span className="text-2xl font-semibold text-[#13AE8D] group-hover:text-[#057857] transition-colors duration-300">
//                 {category.categoryTitle}
//               </span>
//               <div className="mt-4 h-1 w-16 bg-[#13AE8D]/30 group-hover:bg-[#057857] transition-all duration-500"></div>
//             </div>
//           </button>
//         ))}
//       </div>

//       {/* Floating back button */}
//       <div className="mt-16 flex justify-center">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/90 backdrop-blur-sm text-[#13AE8D] font-medium shadow-md hover:bg-[#13AE8D] hover:text-white transition-all duration-300 border border-white/30 hover:border-[#13AE8D]/50"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//           </svg>
//           Back
//         </button>
//       </div>
//     </div>
//   );
// };


export const CategorySelection = ({ categories, categoryObjects, onSelect, onBack }) => {
  return (
    <div className="bg-[#fcf1e6] rounded-xl px-3 sm:px-6 py-10">
      {/* Header */}
      {/* <div className="text-center mb-8">
         <h1 className="text-4xl font-extrabold text-[#000] mb-1">mesudar.com</h1> 
        <p className="text-lg text-gray-600">Making Gabboim's lives easier</p>
      </div> */}

      <div className="text-center mb-10">
        <div className="text-[#535252] ">
          <p className="sm:text-[40px] text-[34px] font-bold">Select a Checklist</p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full lg:max-w-[85%] m-auto">
        {categoryObjects.map((category) => (
          <button
            key={category._id}
            onClick={() => onSelect(category)}
            className="bg-white  group py-4 px-2 sm:py-6 sm:px-4 text-center border-2 border-[#1f7333] rounded-xl hover:bg-[#1f7333] hover:text-[#fff] transition-all duration-200"
          >
            <span className="text-lg  text-[#000] group-hover:text-[#fff] transition-all ease-in-out duration-500" >{category.categoryTitle}</span>
          </button>
        ))}
      </div>

      {/* Back Button */}
      <div className="mt-10 flex justify-start lg:max-w-[85%] m-auto">
        <button
          onClick={onBack}
          className="border-2 border-[#1f7333] text-[#1f7333] font-semibold rounded-full px-6 py-2 hover:bg-[#1f7333] hover:text-[#fff] transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}; 