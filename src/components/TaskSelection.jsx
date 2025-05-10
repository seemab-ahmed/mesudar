export const TaskSelection = ({ 
  selectedCategory, 
  tasksData, 
  checkedItems, 
  onCheckboxChange, 
  onNext, 
  onBack 
}) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-teal-500">mesudar.com</h1>
        <p className="text-base">making gabboim's lives easier</p>
      </div>
      
      <div className="mt-4 text-center">
        <div className="bg-teal-500 text-white rounded-full py-3 px-6 w-64 mx-auto mb-4">
          <p className="text-center font-medium">{selectedCategory} Checklist</p>
        </div>
        <h2 className="text-xl mb-8">Select the tasks that apply to you</h2>
      </div>
      
      {selectedCategory && tasksData[selectedCategory] && 
        Object.entries(tasksData[selectedCategory]).map(([subcategory, tasks], index) => (
          <div key={index} className="mb-8">
            <h3 className="font-bold text-lg mb-3">{subcategory}</h3>
            <div className="space-y-3 ml-2">
              {tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={`${subcategory}-${taskIndex}`}
                    className="w-6 h-6 rounded-full border-2 mr-3"
                    checked={checkedItems[`${subcategory}-${task}`] || false}
                    onChange={(e) => onCheckboxChange(subcategory, task, e.target.checked)}
                  />
                  <label htmlFor={`${subcategory}-${taskIndex}`} className="text-base">
                    {task}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      
      <div className="mt-6 flex justify-between">
        <button 
          onClick={onBack}
          className="border-2 border-teal-500 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          className="bg-teal-500 text-white rounded-full px-8 py-3 hover:bg-teal-600 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};