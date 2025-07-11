





 export const StepsProgress = ({ steps, currentStep }) => {
  return (
<div className="overflow-x-auto flex justify-center">
  <div className="flex justify-start mb-8 min-w-max space-x-6 px-4">
    {steps.map((step, index) => (
      <div key={step.id} className="flex items-center whitespace-nowrap">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center 
            ${index <= currentStep ? 'bg-[#1f7333] text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          {step.id}
        </div>
        <div className={`ml-2 hidden sm:block ${index === currentStep ? 'font-bold' : ''}`}>
          {step.title}
        </div>
        {index < steps.length - 1 && (
          <div className="w-8 h-1 mx-2 bg-gray-200"></div>
        )}
      </div>
    ))}
  </div>
</div>

  );
}; 
