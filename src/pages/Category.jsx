import { useState, useEffect } from 'react';
import { CategorySelection } from '../components/CategorySelection';
import { TaskSelection } from '../components/TaskSelection';
import { ExportStep } from '../components/ExportStep';
import { StepsProgress } from '../components/StepsProgress';
import { WelcomeStep } from '../components/WelcomeStep';

const mainCategory = {
  "message": "All the categories",
  "categories": [
    {
      "_id": "68219bc69a303e1be7c628bd",
      "categoryTitle": "Test Category",
      "subCategory": [
      {
      "subCategoryTitle": "test subcategory",
      "tasks": [
      {
      "taskTitle": "task 1",
      "_id": "68219bde9a303e1be7c628c9"
      },
      {
      "taskTitle": "task 2",
      "_id": "68219be89a303e1be7c628d1"
      },
      {
      "taskTitle": "task 3",
      "_id": "68219c1d9a303e1be7c628fc"
      }
      ],
      "_id": "68219bd29a303e1be7c628c1"
      }
      ],
      "__v": 2
      },
      {
      "_id": "68219cb89a303e1be7c62912",
      "categoryTitle": "Category 2",
      "subCategory": [
      {
      "subCategoryTitle": "sub category 1",
      "tasks": [
      {
      "taskTitle": "task 1",
      "_id": "68219cf99a303e1be7c62951"
      },
      {
      "taskTitle": "task 2",
      "_id": "68219d009a303e1be7c62961"
      },
      {
      "taskTitle": "task 3",
      "_id": "68219d079a303e1be7c62973"
      }
      ],
      "_id": "68219cdd9a303e1be7c62925"
      },
      {
      "subCategoryTitle": "sub category 2",
      "tasks": [
      {
      "taskTitle": "task 1",
      "_id": "68219d279a303e1be7c6299d"
      },
      {
      "taskTitle": "task 2",
      "_id": "68219d2f9a303e1be7c629b3"
      },
      {
      "taskTitle": "task 3",
      "_id": "68219d3b9a303e1be7c629cb"
      }
      ],
      "_id": "68219ce29a303e1be7c6292f"
      },
      {
      "subCategoryTitle": "sub category 3",
      "tasks": [
      {
      "taskTitle": "task 1",
      "_id": "68219d519a303e1be7c62a0f"
      }
      ],
      "_id": "68219ce99a303e1be7c6293b"
      }
      ],
      "__v": 3
      },
      {
      "_id": "68219cc19a303e1be7c62919",
      "categoryTitle": "Category 3",
      "subCategory": [
      {
      "subCategoryTitle": "Subcategory 1",
      "tasks": [
      {
      "taskTitle": "task 1",
      "_id": "68219db99a303e1be7c62a84"
      }
      ],
      "_id": "68219da49a303e1be7c62a49"
      },
      {
      "subCategoryTitle": "Subcategory 2",
      "tasks": [
      {
      "taskTitle": "task 1",
      "_id": "68219dca9a303e1be7c62ac0"
      }
      ],
      "_id": "68219dac9a303e1be7c62a5d"
      }
      ],
      "__v": 2
      },
      {
      "_id": "6821fbaf9a303e1be7c62b13",
      "categoryTitle": "Test 4",
      "subCategory": [
      {
      "subCategoryTitle": "Test",
      "tasks": [],
      "_id": "6821fbcf9a303e1be7c62b61"
      }
      ],
      "__v": 1
      }
  ]
  }
export const Category = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    // const fetchCategories = async () => {
    //   try {
    //     const response = await fetch('https://206.189.225.119/api/user/event');
        
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
        
    //     const data = await response.json();
    //     setCategories(data.categories);
    //     setLoading(false);
    //   } catch (err) {
    //     setError(err.message);
    //     setLoading(false);
    //   }
    // };

    // fetchCategories();
    setCategories(mainCategory.categories);
  }, [categories]);

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
    <div className=" bg-white">
      <div className="max-w-[1080px] 2xl:max-w-[1440px]  px-5 m-auto py-[60px]  ">
        {currentStep > 0 && currentStep <= steps.length && (
          <StepsProgress steps={steps} currentStep={currentStep - 1} />
        )}
        {renderStepContent()}
      </div>
    </div>
  );
};
// border-2 border-teal-500   rounded-lg