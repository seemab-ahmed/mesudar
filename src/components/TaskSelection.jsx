export const TaskSelection = ({
  selectedCategory,
  tasksData,
  checkedItems,
  onCheckboxChange,
  onNext,
  onBack,
}) => {
  const handleSelectAll = (subcategory, tasks) => {
    const allCurrentlySelected = tasks.every(
      task => checkedItems[`${subcategory}-${task}`]
    );
    
    tasks.forEach(task => {
      onCheckboxChange(subcategory, task, !allCurrentlySelected);
    });
  };

  return (
    <div className="bg-[#fcf1e6] py-10 md:px-10 px-3 rounded-xl">
      {/* Category Title */}
      <div className="text-center mb-10">
        {/* <div className="inline-block bg-gradient-to-r from-[#1f7333] to-[#1dd1a1] text-white rounded-full px-8 py-3 shadow-md shadow-teal-300/30 backdrop-blur-md">
          <p className="text-base md:text-lg font-semibold">{selectedCategory} Checklist</p>
        </div> */}
        <h2 className="text-[45px] font-semibold text-[#535252]">
          Select Relevant tasks
        </h2>
      </div>

      {/* Tasks */}
      {selectedCategory.length > 0 && tasksData[selectedCategory] &&
        Object.entries(tasksData[selectedCategory]).map(([subcategory, tasks], index) => {
          const allSelected = tasks.every(task => checkedItems[`${subcategory}-${task}`]);
          const hasTasks = tasks.length > 0;

          return (
            <div
              key={index}
              className="bg-white/80 border-2 border-[#1f7333] rounded-2xl p-6 mb-8"
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[24px] font-bold text-[#1f7333] capitalize">{subcategory}</h3>
                {hasTasks && (
                  <button
                    onClick={() => handleSelectAll(subcategory, tasks)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                      allSelected
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-[#1f7333] text-white hover:bg-[#1f7333]'
                    }`}
                  >
                    {allSelected ? 'Deselect All' : 'Select All'}
                  </button>
                )}
              </div>
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
                    className="peer hidden"
                    checked={checkedItems[`${subcategory}-${task}`] || false}
                    onClick={() => {
                      const key = `${subcategory}-${task}`;
                      const wasChecked = checkedItems[key];
                      onCheckboxChange(subcategory, task, !wasChecked);
                    }}
                    readOnly
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-[#1f7333] flex items-center justify-center transition-all duration-300 peer-checked:bg-[#1f7333]"
                  ></div>
                  <span className="text-gray-800 text-[20px] font-medium group-hover:text-[#1f7333] capitalize">
                    {task}
                  </span>
                </label>
              ))}
            </div>

            </div>
          );
        })}

      {/* Navigation Buttons */}
      <div className="mt-12 flex justify-between items-center">
        <button
          onClick={onBack}
          className="border-2 border-[#1f7333] text-[#1f7333] font-semibold rounded-full px-6 py-2 hover:bg-[#1f7333] hover:text-[#fff] transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-[#1f7333] text-white font-semibold rounded-full hover:shadow-lg hover:bg-[#1f733399] transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
