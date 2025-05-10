import { useState } from 'react';
import { CategorySelection } from '../components/CategorySelection';
import { TaskSelection } from '../components/TaskSelection';
import { ExportStep } from '../components/ExportStep';
import { StepsProgress } from '../components/StepsProgress';
import { WelcomeStep } from '../components/WelcomeStep';

export const Category = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  
  // Steps data
  const steps = [
    { id: 1, title: "Choose a Category" },
    { id: 2, title: "Select the tasks that apply to you" },
    { id: 3, title: "Export your checklist" }
  ];

  // Categories data
  const categories = [
    "Pesach", "Shavuos", "Erev Shabbos", "Daily Cleaning",
    "Bar Mitzvah", "Hachnasas Sefer Torah", "Lag Ba'omer",
    "Sukkos", "Simchas Torah", "Chanukah", "Purim"
  ];

  // Subcategories and tasks data
  const tasksData = {
    Pesach: {
      "Shul Setup": [
        "Print Yom Tov schedule and hang it in the shul",
        "Deep clean the Aron Kodesh and Bimah",
        "Set up extra seating for larger crowds",
        "Prepare Haggadahs for the Seder night",
        "Arrange Siddurim and Chumashim in an organized manner",
        "Confirm that the Mechiras Chametz documents are in place"
      ],
      "Kitchen Prep.": [
        "Print Yom Tov schedule and hang it in the shul",
        "Deep clean the Aron Kodesh and Bimah",
        "Set up extra seating for larger crowds",
        "Prepare Haggadahs for the Seder night",
        "Arrange Siddurim and Chumashim in an organized manner",
        "Confirm that the Mechiras Chametz documents are in place"
      ]
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (subcategory, task, isChecked) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [`${subcategory}-${task}`]: isChecked
    }));
  };

  // Function to proceed to next step
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to go back to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    nextStep();
  };

  // Render the appropriate step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} steps={steps} />;
      
      case 1:
        return (
          <CategorySelection 
            categories={categories} 
            onSelect={handleCategorySelect} 
            onBack={prevStep} 
          />
        );
      
      case 2:
        return (
          <TaskSelection 
            selectedCategory={selectedCategory}
            tasksData={tasksData}
            checkedItems={checkedItems}
            onCheckboxChange={handleCheckboxChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      
      case 3:
        return (
          <ExportStep 
            selectedCategory={selectedCategory}
            tasksData={tasksData}
            checkedItems={checkedItems}
            onBack={prevStep}
            onStartOver={() => setCurrentStep(0)}
          />
        );
        
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-4xl mx-auto p-6 border-2 border-teal-500 rounded-lg">
        {currentStep > 0 && currentStep <= steps.length && (
          <StepsProgress steps={steps} currentStep={currentStep - 1} />
        )}
        {renderStepContent()}
      </div>
    </div>
  );
};

// export const Category = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [checkedItems, setCheckedItems] = useState({});
  
//   // Steps data
//   const steps = [
//     { id: 1, title: "Choose a Category" },
//     { id: 2, title: "Select the tasks that apply to you" },
//     { id: 3, title: "Export your checklist" }
//   ];

//   // Categories data
//   const categories = [
//     "Pesach", "Shavuos", "Erev Shabbos", "Daily Cleaning",
//     "Bar Mitzvah", "Hachnasas Sefer Torah", "Lag Ba'omer",
//     "Sukkos", "Simchas Torah", "Chanukah", "Purim"
//   ];

//   // Subcategories and tasks data
//   const tasksData = {
//     Pesach: {
//       "Shul Setup": [
//         "Print Yom Tov schedule and hang it in the shul",
//         "Deep clean the Aron Kodesh and Bimah",
//         "Set up extra seating for larger crowds",
//         "Prepare Haggadahs for the Seder night",
//         "Arrange Siddurim and Chumashim in an organized manner",
//         "Confirm that the Mechiras Chametz documents are in place"
//       ],
//       "Kitchen Prep.": [
//         "Print Yom Tov schedule and hang it in the shul",
//         "Deep clean the Aron Kodesh and Bimah",
//         "Set up extra seating for larger crowds",
//         "Prepare Haggadahs for the Seder night",
//         "Arrange Siddurim and Chumashim in an organized manner",
//         "Confirm that the Mechiras Chametz documents are in place"
//       ]
//     }
//   };

//   // Handle checkbox changes
//   const handleCheckboxChange = (subcategory, task, isChecked) => {
//     setCheckedItems(prevState => ({
//       ...prevState,
//       [`${subcategory}-${task}`]: isChecked
//     }));
//   };

//   // Function to proceed to next step
//   const nextStep = () => {
//     console.log('step is working ' , currentStep)
//     // setCurrentStep(currentStep + 1);
//     if (currentStep <= steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   // Function to go back to previous step
//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   // Handle category selection
//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     nextStep();
//   };

//   // Export functions
//   const exportAs = (type) => {
//     // In a real application, this would create a PDF/Word/Excel document
//     // For this demo, we'll just simulate the export process
//     console.log(`Exporting as ${type}...`);
//     alert(`Your checklist has been exported as ${type}!`);
//   };

//   // Generate PDF content preview
//   const renderPDFPreview = () => {
//     // Get checked tasks organized by subcategory
//     const checkedTasksBySubcategory = {};
    
//     // Only process if a category is selected and it exists in tasksData
//     if (selectedCategory && tasksData[selectedCategory]) {
//       Object.entries(tasksData[selectedCategory]).forEach(([subcategory, tasks]) => {
//         checkedTasksBySubcategory[subcategory] = tasks.filter(task => 
//           checkedItems[`${subcategory}-${task}`]
//         );
//       });
//     }

//     return (
//       <div className="border-2 border-teal-500 p-4 rounded-lg relative">
//         <div className="bg-teal-500 text-white rounded-full py-2 px-8 mx-auto text-center w-48 mb-6">
//           {selectedCategory} Checklist
//         </div>
        
//         {Object.entries(checkedTasksBySubcategory).map(([subcategory, tasks], index) => (
//           <div key={index} className="mb-6">
//             <h3 className="font-bold mb-2">{subcategory}</h3>
//             {tasks.map((task, taskIndex) => (
//               <div key={taskIndex} className="flex items-center mb-1">
//                 <div className="w-5 h-5 border border-gray-300 mr-2"></div>
//                 <span>{task}</span>
//               </div>
//             ))}
//           </div>
//         ))}
        
//         <div className="text-center text-teal-500 mt-8">
//           <p>mesudar.com</p>
//           <p className="text-sm">making gabboim's lives easier</p>
//         </div>
//       </div>
//     );
//   };

//   // Function to render the appropriate step content
//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-8 max-w-2xl mx-auto">
//             <div className="text-center">
//               <h1 className="text-4xl font-bold text-teal-500">mesudar.com</h1>
//               <p className="text-lg mt-2">making gabboim's lives easier</p>
//             </div>
            
//             <div className="mt-8 space-y-4">
//               <p className="text-lg">Running a shul comes with countless responsibilities.</p>
//               <p className="text-lg">Mesudar.com is a <span className="text-teal-500 font-medium">free tool</span> that makes it easy for Gabboim to create customized checklists for every task — from Shabbos prep and cleaning checklists to Yom Tov management.</p>
//             </div>
            
//             <div className="mt-10">
//               <h2 className="text-xl font-semibold mb-4">How It Works:</h2>
//               <div className="space-y-3">
//                 {steps.map((step) => (
//                   <div key={step.id} className="rounded-full border-2 border-teal-500 py-3 px-6">
//                     <p className="text-center">{step.id}. {step.title}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="mt-6 flex justify-end">
//               <button 
//                 onClick={nextStep}
//                 className="bg-teal-500 text-white rounded-full px-8 py-4 text-lg hover:bg-teal-600 transition-colors"
//               >
//                 let's go
//               </button>
//             </div>
//           </div>
//         );
      
//       case 1:
//         return (
//           <div className="space-y-8 max-w-2xl mx-auto">
//             <div className="text-center">
//               <h1 className="text-3xl font-bold text-teal-500">mesudar.com</h1>
//               <p className="text-base">making gabboim's lives easier</p>
//             </div>
            
//             <div className="mt-8">
//               <div className="bg-teal-500 text-white rounded-full py-3 px-6 w-64 mx-auto mb-12">
//                 <p className="text-center font-medium">Choose a category</p>
//               </div>
              
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {categories.map((category, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleCategorySelect(category)}
//                     className="border-2 border-teal-500 rounded-full py-3 px-4 text-center hover:bg-teal-50 transition-colors"
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             <div className="mt-6 flex justify-between">
//               <button 
//                 onClick={prevStep}
//                 className="border-2 border-teal-500 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         );
      
//       case 2:
//         return (
//           <div className="space-y-8 max-w-2xl mx-auto">
//             <div>
//               <h1 className="text-3xl font-bold text-teal-500">mesudar.com</h1>
//               <p className="text-base">making gabboim's lives easier</p>
//             </div>
            
//             <div className="mt-4 text-center">
//               <div className="bg-teal-500 text-white rounded-full py-3 px-6 w-64 mx-auto mb-4">
//                 <p className="text-center font-medium">{selectedCategory} Checklist</p>
//               </div>
//               <h2 className="text-xl mb-8">Select the tasks that apply to you</h2>
//             </div>
            
//             {selectedCategory && tasksData[selectedCategory] && Object.entries(tasksData[selectedCategory]).map(([subcategory, tasks], index) => (
//               <div key={index} className="mb-8">
//                 <h3 className="font-bold text-lg mb-3">{subcategory}</h3>
//                 <div className="space-y-3 ml-2">
//                   {tasks.map((task, taskIndex) => (
//                     <div key={taskIndex} className="flex items-center">
//                       <input 
//                         type="checkbox" 
//                         id={`${subcategory}-${taskIndex}`}
//                         className="w-6 h-6 rounded-full border-2 mr-3"
//                         checked={checkedItems[`${subcategory}-${task}`] || false}
//                         onChange={(e) => handleCheckboxChange(subcategory, task, e.target.checked)}
//                       />
//                       <label htmlFor={`${subcategory}-${taskIndex}`} className="text-base">
//                         {task}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
            
//             <div className="mt-6 flex justify-between">
//               <button 
//                 onClick={prevStep}
//                 className="border-2 border-teal-500 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors"
//               >
//                 Back
//               </button>
//               <button 
//                 onClick={nextStep}
//                 className="bg-teal-500 text-white rounded-full px-8 py-3 hover:bg-teal-600 transition-colors"
//               >
//                 Continue
//               </button>
//             </div>
//           </div>
//         );
      
//       case 3:
//          console.log("Selected Category:", selectedCategory);
//   console.log("Tasks Data for this category:", tasksData[selectedCategory]);
//   console.log("Checked Items:", checkedItems);
//         return (
//           <div className="space-y-8 max-w-2xl mx-auto">
//             <div>
//               <h1 className="text-3xl font-bold text-teal-500">mesudar.com</h1>
//               <p className="text-base">making gabboim's lives easier</p>
//             </div>
            
//             <div className="mt-4 mb-8">
//               {renderPDFPreview()}
//             </div>
            
//             <div className="mt-4 space-y-3 flex flex-col">
//               <button 
//                 onClick={() => exportAs('PDF')}
//                 className="bg-teal-500 text-white rounded-full py-3 px-6 text-center hover:bg-teal-600 transition-colors"
//               >
//                 Export as PDF
//               </button>
//               <button 
//                 onClick={() => exportAs('Word')}
//                 className="bg-teal-500 text-white rounded-full py-3 px-6 text-center hover:bg-teal-600 transition-colors"
//               >
//                 Export as Word
//               </button>
//               <button 
//                 onClick={() => exportAs('Excel')}
//                 className="bg-teal-500 text-white rounded-full py-3 px-6 text-center hover:bg-teal-600 transition-colors"
//               >
//                 Export as Excel
//               </button>
//             </div>
            
//             <div className="mt-6 flex justify-between">
//               <button 
//                 onClick={prevStep}
//                 className="border-2 border-teal-500 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors"
//               >
//                 Back
//               </button>
//               <button 
//                 onClick={() => setCurrentStep(0)}
//                 className="border-2 border-teal-500 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors"
//               >
//                 Start Over
//               </button>
//             </div>
//           </div>
//         );
        
//       default:
//         return <div>Unknown step</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-white">
//       <div className="max-w-4xl mx-auto p-6 border-2 border-teal-500 rounded-lg">
//         {renderStepContent()}
//       </div>
//     </div>
//   );
// }