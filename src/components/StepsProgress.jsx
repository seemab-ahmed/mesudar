





 export const StepsProgress = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-8 ">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${index <= currentStep ? 'bg-[#13AE8D] text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {step.id}
          </div>
          <div className={`ml-2 ${index === currentStep ? 'font-bold' : ''}`}>
            {step.title}
          </div>
          {index < steps.length - 1 && (
            <div className="w-8 h-1 mx-2 bg-gray-200"></div>
          )}
        </div>
      ))}
    </div>
  );
}; 



  {/* Step Title 
export const StepsProgress = ({ steps, currentStep }) => {
  return (
    <div className="overflow-x-scroll">
    <div className="flex justify-center items-center mb-10  px-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
         
          <div
            className={`
              w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
              ${index < currentStep
                ? 'bg-[#13AE8D] border-[#13AE8D] text-white'
                : index === currentStep
                ? 'bg-white border-[#13AE8D] text-[#13AE8D] font-bold'
                : 'bg-gray-100 border-gray-300 text-gray-400'}
            `}
          >
            {step.id}
          </div>

          
          <div className="ml-3">
            <span className={`text-sm transition-all ${index <= currentStep ? 'text-teal-600 font-semibold' : 'text-gray-400'}`}>
              {step.title}
            </span>
          </div>

       
          {index < steps.length - 1 && (
            <div className="w-8 h-1 bg-gray-300 mx-4 rounded-full"></div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};
*/}



