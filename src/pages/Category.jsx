import { useState, useEffect, useCallback } from 'react';
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
  const [loading, setLoading] = useState(true); // Initialize as true since we load on mount
  const [error, setError] = useState(null);

  // Memoized fetch function to prevent recreation on every render
  // const fetchCategories = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     // const response = await fetch('https://admin.mesudar.com/api/user/event');
  //     const response = await fetch('http://localhost:3000/api/user/event');
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setCategories(data.categories);
  //     setError(null);
  //   } catch (err) {
  //     setError(err.message);
  //     // Optionally: retry logic could go here
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []); // Empty dependency array means this is created once


  const fetchCategories = useCallback(async () => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:3000/categories');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setCategories(data); // JSON Server returns array directly
    setError(null);
  } catch (err) {
    setError(err.message);
    console.error("Fetch error:", err);
    // Fallback to local data if needed
    // setCategories(localFallbackCategories);
  } finally {
    setLoading(false);
  }
}, []);

  // Fetch categories on component mount only
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]); // Only runs when fetchCategories changes (which it won't)

  // Steps data - moved outside component or memoized since it's static
  const steps = [
    { id: 1, title: "Choose a Category" },
    { id: 2, title: "Select the tasks that apply to you" },
    { id: 3, title: "Export your checklist" }
  ];

  // Memoized task data transformation
  const getTasksData = useCallback(() => {
    if (!selectedCategory) return {};
    
    const category = categories.find(cat => cat._id === selectedCategory._id);
    if (!category) return {};
    
    const tasksData = {};
    tasksData[category.categoryTitle] = {};
    
    category.subCategory.forEach(subCat => {
      tasksData[category.categoryTitle][subCat.subCategoryTitle] = 
        subCat?.tasks.map(task => task?.taskTitle);
    });
    
    return tasksData;
  }, [categories, selectedCategory]);

  // Handle checkbox changes
  const handleCheckboxChange = useCallback((subcategory, task, isChecked) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [`${subcategory}-${task}`]: isChecked
    }));
  }, []);

  // Navigation functions
  const nextStep = useCallback(() => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // Handle category selection
  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    nextStep();
  }, [nextStep]);

  // Render the appropriate step content
  const renderStepContent = useCallback(() => {
    if (loading) return <div className="text-center py-8">Loading categories...</div>;
    if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

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
  }, [
    currentStep, 
    loading, 
    error, 
    categories, 
    selectedCategory, 
    checkedItems, 
    getTasksData, 
    handleCheckboxChange, 
    handleCategorySelect, 
    nextStep, 
    prevStep, 
    steps
  ]);

  return (
    <div className="bg-white">
      <div className="max-w-[1080px] xl:max-w-[1300px] px-5 m-auto py-[60px]">
        {currentStep > 0 && currentStep <= steps.length && (
          <StepsProgress steps={steps} currentStep={currentStep - 1} />
        )}
        {renderStepContent()}
      </div>
    </div>
  );
};