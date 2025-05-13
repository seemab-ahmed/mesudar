export const CategorySelection = ({ categories, categoryObjects, onSelect, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#13AE8D] mb-1">mesudar.com</h1>
        <p className="text-lg text-gray-600">Making Gabboim's lives easier</p>
      </div>

      {/* Category Title */}
      <div className="text-center mb-12">
        <div className="bg-[#13AE8D] text-white rounded-full py-3 px-8 inline-block shadow-md">
          <p className="text-lg font-semibold">Choose a category</p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoryObjects.map((category) => (
          <button
            key={category._id}
            onClick={() => onSelect(category)}
            className="bg-white border border-[#13AE8D] group rounded-xl py-6 px-4 text-center shadow-sm hover:shadow-lg hover:bg-[#13AE8D] hover:text-[#000] transition-all duration-200"
          >
            <span className="text-lg font-semibold text-[#13AE8D] group-hover:text-[#000] transition-all ease-in-out duration-500" >{category.categoryTitle}</span>
          </button>
        ))}
      </div>

      {/* Back Button */}
      <div className="mt-10 flex justify-start">
        <button
          onClick={onBack}
          className="border-2 border-[#13AE8D] text-[#13AE8D] font-semibold rounded-full px-6 py-2 hover:bg-[#13AE8D] hover:text-[#fff] transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
};
