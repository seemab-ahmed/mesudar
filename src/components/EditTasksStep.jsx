import React, { useState } from 'react';

// Trash icon for delete actions
const TrashIcon = () => (
  <svg className="inline w-5 h-5 text-black hover:text-red-600" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="11" fill="#1f7333"/>
    <path d="M8 8L14 14M14 8L8 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const EditTasksStep = ({
  selectedCategory,
  tasksData,
  checkedItems,
  setCheckedItems,
  onSave,
  onBack
}) => {
  const [showAddSubCat, setShowAddSubCat] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState('');
  const [localTasksData, setLocalTasksData] = useState(tasksData);
  const [addTaskState, setAddTaskState] = useState({});
  const [editingSubCat, setEditingSubCat] = useState('');
  const [editingSubCatValue, setEditingSubCatValue] = useState('');
  const [editingTask, setEditingTask] = useState({ subCat: '', idx: -1 });
  const [editingTaskValue, setEditingTaskValue] = useState('');

  // Add subcategory
  const handleAddSubCategory = () => {
    if (!newSubCategory.trim()) return;
    setLocalTasksData(prev => {
      const updated = { ...prev };
      if (!updated[selectedCategory.categoryTitle]) {
        updated[selectedCategory.categoryTitle] = {};
      }
      updated[selectedCategory.categoryTitle][newSubCategory] = [];
      return updated;
    });
    setNewSubCategory('');
    setShowAddSubCat(false);
  };

  // Add task to subcategory
  const handleAddTask = (subCat) => {
    const value = addTaskState[subCat]?.value || '';
    if (!value.trim()) return;
    setLocalTasksData(prev => {
      const updated = { ...prev };
      if (!updated[selectedCategory.categoryTitle][subCat]) {
        updated[selectedCategory.categoryTitle][subCat] = [];
      }
      updated[selectedCategory.categoryTitle][subCat] = [
        ...updated[selectedCategory.categoryTitle][subCat],
        value
      ];
      return updated;
    });
    setAddTaskState(prev => ({
      ...prev,
      [subCat]: { show: false, value: '' }
    }));
  };

  // Remove task
  const handleRemoveTask = (subCat, taskIdx) => {
    setLocalTasksData(prev => {
      const updated = { ...prev };
      updated[selectedCategory.categoryTitle][subCat] = updated[selectedCategory.categoryTitle][subCat].filter(
        (_, idx) => idx !== taskIdx
      );
      return updated;
    });
  };

  // Remove subcategory
  const handleRemoveSubCategory = (subCat) => {
    setLocalTasksData(prev => {
      const updated = { ...prev };
      delete updated[selectedCategory.categoryTitle][subCat];
      return updated;
    });
  };

  // Toggle checked state
  const handleCheck = (subCat, task) => {
    setCheckedItems(prev => ({
      ...prev,
      [`${subCat}-${task}`]: !prev[`${subCat}-${task}`]
    }));
  };

  // Edit subcategory name
  const startEditSubCat = (subCat) => {
    setEditingSubCat(subCat);
    setEditingSubCatValue(subCat);
  };
  const saveEditSubCat = (oldSubCat) => {
    const newSubCat = editingSubCatValue.trim();
    if (!newSubCat || newSubCat === oldSubCat) {
      setEditingSubCat('');
      setEditingSubCatValue('');
      return;
    }
    setLocalTasksData(prev => {
      const updated = { ...prev };
      const catTitle = selectedCategory.categoryTitle;
      if (updated[catTitle][newSubCat]) {
        setEditingSubCat('');
        setEditingSubCatValue('');
        return updated;
      }
      updated[catTitle][newSubCat] = updated[catTitle][oldSubCat];
      delete updated[catTitle][oldSubCat];
      return updated;
    });
    setEditingSubCat('');
    setEditingSubCatValue('');
  };

  // Edit task name
  const startEditTask = (subCat, idx, task) => {
    setEditingTask({ subCat, idx });
    setEditingTaskValue(task);
  };
  const saveEditTask = (subCat, idx, oldTask) => {
    const newTask = editingTaskValue.trim();
    if (!newTask || newTask === oldTask) {
      setEditingTask({ subCat: '', idx: -1 });
      setEditingTaskValue('');
      return;
    }
    setLocalTasksData(prev => {
      const updated = { ...prev };
      const catTitle = selectedCategory.categoryTitle;
      const tasks = [...updated[catTitle][subCat]];
      tasks[idx] = newTask;
      updated[catTitle][subCat] = tasks;
      return updated;
    });
    setEditingTask({ subCat: '', idx: -1 });
    setEditingTaskValue('');
  };

  // Prepare to pass edited data forward
  const handleContinue = () => {
    onSave(localTasksData);
  };

  const categoryTitle = selectedCategory?.categoryTitle;
  const subCategories = Object.keys(localTasksData[categoryTitle] || {});

  return (
    <div className="bg-[#fcf1e6] py-10 md:px-10 px-3 rounded-xl">
      <h1 className="text-center sm:text-[30px] text-[25px] font-semibold  text-[#535252]">
        Customize your checklist
      </h1>
      <p className='text-center mb-2 text-[18px]'>Add and edit tasks</p>
      {/* Add Subcategory */}
      

      <div className="mb-8">
        <div className="flex items-center p2   md:max-w-[80%] w-full mx-auto mb-4">
        {!showAddSubCat ? (
          <button
            className="flex items-center text-[#1f7333] font-semibold hover:underline"
            onClick={() => setShowAddSubCat(true)}
            type="button"
          >
             Add Subcategory <span className="text-2xl ml-2"> 
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="11" fill="#1f7333"/>
                <path d="M11 6V16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 11H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
             </span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newSubCategory}
              onChange={e => setNewSubCategory(e.target.value)}
              placeholder="Subcategory name"
              className="border border-[#1f7333] rounded px-2 py-1 focus:ring-[#1f7333] focus:border-[#1f7333] text-base"
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') handleAddSubCategory();
                if (e.key === 'Escape') { setShowAddSubCat(false); setNewSubCategory(''); }
              }}
            />
            <button
              onClick={handleAddSubCategory}
              className="bg-[#1f7333] text-white px-3 py-1 rounded text-base"
              type="button"
            >
              Add
            </button>
            <button
              onClick={() => { setShowAddSubCat(false); setNewSubCategory(''); }}
              className="text-gray-400 px-2 text-xl"
              type="button"
              title="Cancel"
            >
           x
            </button>
          </div>
        )}
      </div>
        {subCategories.length === 0 && (
          <div className="text-gray-500 mb-2">No subcategories yet.</div>
        )}
        {subCategories.map(subCat => (
            
          <div key={subCat} className="border border-[#1f7333] shadow-md p-6  rounded-2xl bg-white md:max-w-[80%] w-full mx-auto mb-4">
          
            <div className="flex items-center justify-between mb-3">
              {editingSubCat === subCat ? (
                <input
                  type="text"
                  value={editingSubCatValue}
                  onChange={e => setEditingSubCatValue(e.target.value)}
                  onBlur={() => saveEditSubCat(subCat)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') saveEditSubCat(subCat);
                    if (e.key === 'Escape') { setEditingSubCat(''); setEditingSubCatValue(''); }
                  }}
                  className="border-b border-[#1f7333] px-1 py-0.5 text-lg font-semibold focus:outline-none focus:border-[#1f7333] bg-white"
                  autoFocus
                  style={{ minWidth: 120 }}
                />
              ) : (
                <span
                  className="font-semibold text-lg text-[#1f7333] cursor-pointer hover:underline"
                  onClick={() => startEditSubCat(subCat)}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') startEditSubCat(subCat); }}
                >
                  {subCat}
                </span>
              )}
            </div>
            <ul className="ml-2">
              {(localTasksData[categoryTitle][subCat] || []).map((task, idx) => (
                <li key={task + idx} className="flex items-center mb-2 group">
                  <div className="w-4 h-4 mr-2 border-2 border-[#1f7333] rounded-[5px] flex items-center justify-center text-xs text-black"></div>
                  {editingTask.subCat === subCat && editingTask.idx === idx ? (
                    <input
                      type="text"
                      value={editingTaskValue}
                      onChange={e => setEditingTaskValue(e.target.value)}
                      onBlur={() => saveEditTask(subCat, idx, task)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') saveEditTask(subCat, idx, task);
                        if (e.key === 'Escape') { setEditingTask({ subCat: '', idx: -1 }); setEditingTaskValue(''); }
                      }}
                      className="border-b border-[#1f7333] px-1 py-0.5 focus:outline-none focus:border-[#1f7333] bg-white text-base"
                      autoFocus
                      style={{ minWidth: 80 }}
                    />
                  ) : (
                    <span
                      className="cursor-pointer hover:underline text-black text-base"
                      onClick={() => startEditTask(subCat, idx, task)}
                      tabIndex={0}
                      onKeyDown={e => { if (e.key === 'Enter') startEditTask(subCat, idx, task); }}
                    >
                      {task}
                    </span>
                  )}
                  <button
                    className="ml-2 text-xs text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveTask(subCat, idx)}
                    type="button"
                    title="Delete Task"
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>
            {/* Add Task */}
            <div className="mt-3">
              {!addTaskState[subCat]?.show ? (
                <button
                  className="flex items-center text-[#1f7333] font-medium hover:underline"
                  onClick={() =>
                    setAddTaskState(prev => ({
                      ...prev,
                      [subCat]: { show: true, value: '' }
                    }))
                  }
                  type="button"
                >
                   Add Task 
                   <span className="text-2xl ml-2">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="11" fill="#1f7333"/>
                      <path d="M11 6V16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M6 11H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={addTaskState[subCat]?.value || ''}
                    onChange={e =>
                      setAddTaskState(prev => ({
                        ...prev,
                        [subCat]: { ...prev[subCat], value: e.target.value }
                      }))
                    }
                    placeholder="Task name"
                    className="border border-[#1f7333] rounded px-2 py-1 focus:ring-[#1f7333] focus:border-[#1f7333] text-base"
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleAddTask(subCat);
                      if (e.key === 'Escape') setAddTaskState(prev => ({ ...prev, [subCat]: { show: false, value: '' } }));
                    }}
                  />
                  <button
                    onClick={() => handleAddTask(subCat)}
                    className="bg-[#1f7333] text-white px-3 py-1 rounded text-base"
                    type="button"
                  >
                    Add
                  </button>
                  <button
                    onClick={() =>
                      setAddTaskState(prev => ({
                        ...prev,
                        [subCat]: { show: false, value: '' }
                      }))
                    }
                    className="text-gray-400 px-2 text-xl"
                    type="button"
                    title="Cancel"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={onBack}
          className="border-2 border-[#1f7333] text-[#1f7333] font-semibold rounded-full px-6 py-2 hover:bg-[#1f7333] hover:text-[#fff] transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="text-[#1f7333] border-2 border-[#1f7333] py-2 px-6 rounded-full hover:bg-[#1f7333] hover:text-[#fff] transition"
        >
          Continue to Preview
        </button>
      </div>
    </div>
  );
};