export const StepsProgress = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${index <= currentStep ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'}`}
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