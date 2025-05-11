export const CategorySelection = ({ categories, categoryObjects, onSelect, onBack }) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-teal-500">mesudar.com</h1>
        <p className="text-base">making gabboim's lives easier</p>
      </div>
      
      <div className="mt-8">
        <div className="bg-teal-500 text-white rounded-full py-3 px-6 w-64 mx-auto mb-12">
          <p className="text-center font-medium">Choose a category</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categoryObjects.map((category, index) => (
            <button
              key={category._id}
              onClick={() => onSelect(category)}
              className="border-2 border-teal-500 rounded-full py-3 px-4 text-center hover:bg-teal-50 transition-colors"
            >
              {category.categoryTitle}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <button 
          onClick={onBack}
          className="border-2 border-teal-500 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
};