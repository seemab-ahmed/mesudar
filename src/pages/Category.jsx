import { useState, useEffect } from 'react';
import { CategorySelection } from '../components/CategorySelection';
import { TaskSelection } from '../components/TaskSelection';
import { ExportStep } from '../components/ExportStep';
import { StepsProgress } from '../components/StepsProgress';
import { WelcomeStep } from '../components/WelcomeStep';

export const Category = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://206.189.225.119/api/user/event');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCategories(data.categories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Steps data
  const steps = [
    { id: 1, title: "Choose a Category" },
    { id: 2, title: "Select the tasks that apply to you" },
    { id: 3, title: "Export your checklist" }
  ];

  // Transform the API data into tasksData format
  const getTasksData = () => {
    if (!selectedCategory) return {};
    
    const category = categories.find(cat => cat._id === selectedCategory._id);
    if (!category) return {};
    
    const tasksData = {};
    tasksData[category.categoryTitle] = {};
    
    category.subCategory.forEach(subCat => {
      tasksData[category.categoryTitle][subCat.subCategoryTitle] = 
        subCat.tasks.map(task => task.taskTitle);
    });
    
    return tasksData;
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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} steps={steps} />;
      
      case 1:
        return (
          <CategorySelection 
            categories={categories.map(cat => cat.categoryTitle)} 
            categoryObjects={categories}
            onSelect={handleCategorySelect} 
            onBack={prevStep} 
          />
        );
      
      case 2:
        return (
          <TaskSelection 
            selectedCategory={selectedCategory?.categoryTitle || ''}
            tasksData={getTasksData()}
            checkedItems={checkedItems}
            onCheckboxChange={handleCheckboxChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      
      case 3:
        return (
          <ExportStep 
            selectedCategory={selectedCategory?.categoryTitle || ''}
            tasksData={getTasksData()}
            checkedItems={checkedItems}
            onBack={prevStep}
            onStartOver={() => {
              setCurrentStep(0);
              setCheckedItems({});
            }}
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
