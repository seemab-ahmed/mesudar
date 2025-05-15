export const TaskSelection = ({
  selectedCategory,
  tasksData,
  checkedItems,
  onCheckboxChange,
  onNext,
  onBack,
}) => {
  return (
    <div className="py-12 px-5 max-w-4xl mx-auto">
      {/* Header */}
      {/* <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-[#000] mb-2">
          mesudar.com
        </h1>
        <p className="text-lg text-gray-500 tracking-wide">Making Gabboim's lives easier</p>
      </div> */}

      {/* Category Title */}
      <div className="text-center mb-12">
        <div className="inline-block bg-gradient-to-r from-[#13AE8D] to-[#1dd1a1] text-white rounded-full px-8 py-3 shadow-md shadow-teal-300/30 backdrop-blur-md">
          <p className="text-base md:text-lg font-semibold">{selectedCategory} Checklist</p>
        </div>
        <h2 className="text-2xl font-semibold mt-6 text-gray-800">
          Select the tasks that apply to you
        </h2>
      </div>

      {/* Tasks */}
      {selectedCategory && tasksData[selectedCategory] &&
        Object.entries(tasksData[selectedCategory]).map(([subcategory, tasks], index) => (
          <div
            key={index}
            className="bg-white/80 border border-gray-200 rounded-2xl p-6 mb-8 shadow-md hover:shadow-xl transition-shadow backdrop-blur-lg"
          >
            <h3 className="text-xl font-bold text-[#13AE8D] mb-5 capitalize">{subcategory}</h3>
            <div className="space-y-4">
              {tasks.map((task, taskIndex) => (
                <label
                  key={taskIndex}
                  htmlFor={`${subcategory}-${taskIndex}`}
                  className="flex items-center gap-4 cursor-pointer group"
                >
                <input
                  type="radio"
                  id={`${subcategory}-${taskIndex}`}
                  className="w-5 h-5 accent-black"
                  checked={checkedItems[`${subcategory}-${task}`] || false}
                  onClick={() => {
                    const key = `${subcategory}-${task}`;
                    const wasChecked = checkedItems[key];
                    onCheckboxChange(subcategory, task, !wasChecked); // toggle manually
                  }}
                  readOnly
                />


                  <span className="text-gray-800 text-base font-medium group-hover:text-[#13AE8D] capitalize">
                    {task}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

      {/* Navigation Buttons */}
      <div className="mt-12 flex justify-between items-center">
      <button
          onClick={onBack}
          className="border-2 border-[#13AE8D] text-[#13AE8D] font-semibold rounded-full px-6 py-2 hover:bg-[#13AE8D] hover:text-[#fff] transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-[#13AE8D] text-white font-semibold rounded-full hover:shadow-lg hover:bg-[#0f9d80] transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
};












// export const TaskSelection = ({
//   selectedCategory,
//   tasksData,
//   checkedItems,
//   onCheckboxChange,
//   onNext,
//   onBack,
// }) => {
//   return (
//     <div className="py-8">
//       {/* Header */}
//       <div className="text-center mb-6">
//         <h1 className="text-4xl font-extrabold text-teal-500 mb-1">mesudar.com</h1>
//         <p className="text-lg text-gray-600">Making Gabboim's lives easier</p>
//       </div>

//       {/* Category Badge */}
//       <div className="text-center mb-10">
//         <div className="bg-teal-500 text-white rounded-full py-3 px-8 inline-block shadow-md">
//           <p className="text-lg font-semibold">{selectedCategory} Checklist</p>
//         </div>
//         <h2 className="text-2xl font-semibold mt-6 text-gray-800">Select the tasks that apply to you</h2>
//       </div>

//       {/* Tasks */}
//       {selectedCategory && tasksData[selectedCategory] &&
//         Object.entries(tasksData[selectedCategory]).map(([subcategory, tasks], index) => (
//           <div key={index} className="bg-white border border-[#13AE8D] rounded-xl p-6 mb-8 shadow-sm hover:shadow-md transition-shadow">
//             <h3 className="text-xl font-bold text-[#13AE8D] mb-4 capitalize">{subcategory}</h3>
//             <div className="space-y-4">
//               {tasks.map((task, taskIndex) => (
//                 <label
//                   key={taskIndex}
//                   htmlFor={`${subcategory}-${taskIndex}`}
//                   className="flex items-center cursor-pointer group"
//                 >
//                   <input
//                     type="radio"
//                     id={`${subcategory}-${taskIndex}`}
//                     className="w-5 h-5  mr-4 transition-all duration-200 accent-[#13AE8D]"
//                     checked={checkedItems[`${subcategory}-${task}`] || false}
//                     onChange={(e) =>
//                       onCheckboxChange(subcategory, task, e.target.checked)
//                     }
//                   />
//                   <span className="text-gray-800 font-medium capitalize group-hover:text-[#13AE8D]">
//                     {task}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}

//       {/* Buttons */}
//       <div className="mt-10 flex justify-between">
//         <button
//           onClick={onBack}
//           className="border-2 border-[#13AE8D] text-[#13AE8D] font-semibold rounded-full px-6 py-2 hover:bg-[#13AE8D] hover:text-[#fff] transition-colors"
//         >
//           Back
//         </button>
//         <button
//           onClick={onNext}
//           className="bg-[#13AE8D] text-white font-semibold rounded-full px-8 py-3 hover:bg-teal-600 shadow-md transition-all"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };
