export const WelcomeStep = ({ onNext, steps }) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-teal-500">mesudar.com</h1>
        <p className="text-lg mt-2">making gabboim's lives easier</p>
      </div>
      
      <div className="mt-8 space-y-4">
        <p className="text-lg">Running a shul comes with countless responsibilities.</p>
        <p className="text-lg">Mesudar.com is a <span className="text-teal-500 font-medium">free tool</span> that makes it easy for Gabboim to create customized checklists for every task — from Shabbos prep and cleaning checklists to Yom Tov management.</p>
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">How It Works:</h2>
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.id} className="rounded-full border-2 border-teal-500 py-3 px-6">
              <p className="text-center">{step.id}. {step.title}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={onNext}
          className="bg-teal-500 text-white rounded-full px-8 py-4 text-lg hover:bg-teal-600 transition-colors"
        >
          let's go
        </button>
      </div>
    </div>
  );
};