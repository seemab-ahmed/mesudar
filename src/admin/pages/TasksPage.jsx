// // TasksPage.jsx
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
// import { deleteTask, fetchCategories } from '../services/api';
// import { TaskForm } from '../components/TaskForm';

// export const TasksPage = () => {
//   const { catId, subCatId } = useParams();
//   const navigate = useNavigate();
//   const [category, setCategory] = useState(null);
//   const [subCategory, setSubCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingTask, setEditingTask] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const data = await fetchCategories();
//         const foundCategory = data.categories.find(cat => cat._id === catId);
//         if (foundCategory) {
//           setCategory(foundCategory);
//           const foundSubCategory = foundCategory.subCategory.find(sub => sub._id === subCatId);
//           if (foundSubCategory) {
//             setSubCategory(foundSubCategory);
//           } else {
//             setError('Subcategory not found');
//           }
//         } else {
//           setError('Category not found');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [catId, subCatId, refreshTrigger]);

//   const handleEdit = (task) => {
//     setEditingTask(task);
//     navigate(`/admin/tasks/${catId}/${subCatId}/edit/${task._id}`);
//   };

//   const handleSuccess = () => {
//     setEditingTask(null);
//     setRefreshTrigger(prev => !prev);
//     navigate(`/admin/tasks/${catId}/${subCatId}`);
//   };

//   const handleDeleteTask = async (taskId) => {
//   if (window.confirm('Are you sure you want to delete this task?')) {
//     try {
//       await deleteTask(catId, subCatId, taskId);
//       setRefreshTrigger(prev => !prev);
//     } catch (err) {
//       alert('Failed to delete task');
//     }
//   }
// };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!category || !subCategory) return <div>Not found</div>;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-teal-700">
//         Tasks for {subCategory.subCategoryTitle}
//       </h2>
      
//       <Routes>
//         <Route 
//           path="/" 
//           element={
//             <div className="space-y-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-medium">Manage Tasks</h3>
//                 <button 
//                   onClick={() => navigate(`/admin/tasks/${catId}/${subCatId}/new`)}
//                   className="bg-teal-500 text-white rounded-full px-4 py-2 hover:bg-teal-600"
//                 >
//                   Add Task
//                 </button>
//               </div>
              
//               <div className="space-y-2">
//                 {subCategory?.tasks.map(task => (
//                   <div key={task?._id} className="flex justify-between items-center p-4 border rounded-lg">
//                     <div>
//                       <h4 className="font-medium">{task?.taskTitle}</h4>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button 
//                         onClick={() => handleEdit(task)}
//                         className="text-blue-500 hover:text-blue-700"
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteTask(task._id)}
//                         className="text-red-500 hover:text-red-700"
//                     >
//                         Delete
//                     </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           } 
//         />
//         <Route 
//           path="/new" 
//           element={<TaskForm categoryId={catId} subCategoryId={subCatId} onSuccess={handleSuccess} />} 
//         />
//         <Route 
//           path="/edit/:taskId" 
//           element={<TaskForm categoryId={catId} subCategoryId={subCatId} task={editingTask} onSuccess={handleSuccess} />} 
//         />
//       </Routes>
//     </div>
//   );
// };




// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
// import { deleteTask, fetchCategories } from '../services/api';
// import { TaskForm } from '../components/TaskForm';
// import { createTask, updateTask } from '../services/api';

// export const TasksPage = () => {
//   const { catId, subCatId } = useParams();
//   const navigate = useNavigate();
//   const [category, setCategory] = useState(null);
//   const [subCategory, setSubCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingTask, setEditingTask] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [draggedTask, setDraggedTask] = useState(null);
//   const [dragOverIndex, setDragOverIndex] = useState(null);
//   const [title, setTitle] = useState(editingTask?.taskTitle || '');
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     try {
//       if (task) {
//         await updateTask(catId, subCatId, editingTask._id, title);
//       } else {
//         await createTask(catId, subCatId, title);
//       }
//       handleSuccess();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const data = await fetchCategories();
//         const foundCategory = data.categories.find(cat => cat._id === catId);
//         if (foundCategory) {
//           setCategory(foundCategory);
//           const foundSubCategory = foundCategory.subCategory.find(sub => sub._id === subCatId);
//           if (foundSubCategory) {
//             setSubCategory(foundSubCategory);
//           } else {
//             setError('Subcategory not found');
//           }
//         } else {
//           setError('Category not found');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [catId, subCatId, refreshTrigger]);

//   const handleEdit = (task) => {
//     setEditingTask(task);
//     navigate(`/admin/tasks/${catId}/${subCatId}/edit/${task._id}`);
//   };

//   const handleSuccess = () => {
//     setEditingTask(null);
//     setRefreshTrigger(prev => !prev);
//     navigate(`/admin/tasks/${catId}/${subCatId}`);
//   };

//   const handleDeleteTask = async (taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       try {
//         await deleteTask(catId, subCatId, taskId);
//         setRefreshTrigger(prev => !prev);
//       } catch (err) {
//         alert('Failed to delete task');
//       }
//     }
//   };

//   // Drag and drop handlers
//   const handleDragStart = (index) => {
//     setDraggedTask(index);
//   };

//   const handleDragOver = (e, index) => {
//     e.preventDefault();
//     setDragOverIndex(index);
//   };

//   const handleDrop = async (e, index) => {
//     e.preventDefault();
    
//     if (draggedTask === null || draggedTask === index || !subCategory) return;

//     // Make a copy of the tasks array
//     const newTasks = [...subCategory.tasks];
    
//     // Remove the dragged item
//     const draggedItem = newTasks[draggedTask];
//     newTasks.splice(draggedTask, 1);
    
//     // Add it at the new position
//     newTasks.splice(index, 0, draggedItem);
    
//     // Update the local state
//     setSubCategory({
//       ...subCategory,
//       tasks: newTasks
//     });

//     // Reset drag states
//     setDraggedTask(null);
//     setDragOverIndex(null);

//     // Prepare the order array (just task IDs in new order)
//     const taskOrder = newTasks.map(task => task._id);

//     try {
//       // Send the new order to the backend
//       // await updateTaskOrder(catId, subCatId, taskOrder);
//       console.log({taskOrder});
//     } catch (err) {
//       alert('Failed to save task order');
//       // Revert if the API call fails
//       setRefreshTrigger(prev => !prev);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!category || !subCategory) return <div>Not found</div>;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-teal-700">
//         Tasks for {subCategory.subCategoryTitle}
//       </h2>
      
//       <Routes>
//         <Route 
//           path="/" 
//           element={
//             <div className="space-y-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-medium">Manage Tasks</h3>
//                  {error && <div className="text-red-500">{error}</div>}      
//       <form onSubmit={handleSubmit} className="space-y-4 flex">
//         <div>
//           <input
//             type="text"
//             id="title"
//             placeholder={editingTask ? 'Edit Task' : 'Add New Task'}
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
//             required
//           />
//         </div>
        
//         <div className="flex space-x-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-teal-500 text-white rounded-full px-4 py-2 hover:bg-teal-600 disabled:opacity-50"
//           >
//             {loading ? 'Saving...' : 'Save'}
//           </button>
//         </div>
//       </form>
//               </div>
              
//               <div className="space-y-2">
//                 {subCategory.tasks.map((task, index) => (
//                   <div 
//                     key={task._id} 
//                     draggable
//                     onDragStart={() => handleDragStart(index)}
//                     onDragOver={(e) => handleDragOver(e, index)}
//                     onDrop={(e) => handleDrop(e, index)}
//                     className={`flex justify-between items-center p-4 border rounded-lg cursor-move
//                       ${dragOverIndex === index ? 'bg-blue-50 border-teal-600' : 'bg-white'}
//                       ${draggedTask === index ? 'opacity-50' : 'opacity-100'}
//                     `}
//                   >
//                     <div>
//                       <h4 className="font-medium">{task.taskTitle}</h4>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button 
//                         onClick={() => handleEdit(task)}
//                         className="text-blue-500 hover:text-blue-700"
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteTask(task._id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           } 
//         />
//       </Routes>
//     </div>
//   );
// };



import { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { deleteTask, fetchCategories, createTask, updateTask } from '../services/api';

export const TasksPage = () => {
  const { catId, subCatId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCategories();
        const foundCategory = data.categories.find(cat => cat._id === catId);
        if (foundCategory) {
          setCategory(foundCategory);
          const foundSubCategory = foundCategory.subCategory.find(sub => sub._id === subCatId);
          if (foundSubCategory) {
            setSubCategory(foundSubCategory);
          } else {
            setError('Subcategory not found');
          }
        } else {
          setError('Category not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [catId, subCatId, refreshTrigger]);

  useEffect(() => {
    if (editingTask) {
      setTaskTitle(editingTask.taskTitle);
    } else {
      setTaskTitle('');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (editingTask) {
        await updateTask(catId, subCatId, editingTask._id, taskTitle);
      } else {
        await createTask(catId, subCatId, taskTitle);
      }
      handleSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setTaskTitle('');
  };

  const handleSuccess = () => {
    setEditingTask(null);
    setTaskTitle('');
    setRefreshTrigger(prev => !prev);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(catId, subCatId, taskId);
        setRefreshTrigger(prev => !prev);
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  // Drag and drop handlers
  const handleDragStart = (index) => {
    setDraggedTask(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = async (e, index) => {
    e.preventDefault();
    
    if (draggedTask === null || draggedTask === index || !subCategory) return;

    const newTasks = [...subCategory.tasks];
    const draggedItem = newTasks[draggedTask];
    newTasks.splice(draggedTask, 1);
    newTasks.splice(index, 0, draggedItem);
    
    setSubCategory({
      ...subCategory,
      tasks: newTasks
    });

    setDraggedTask(null);
    setDragOverIndex(null);

    const taskOrder = newTasks.map(task => task._id);
    console.log({taskOrder});
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!category || !subCategory) return <div className="p-4">Not found</div>;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-teal-700">
        Tasks for {subCategory.subCategoryTitle}
      </h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Manage Tasks</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder={editingTask ? 'Edit Task' : 'Add New Task'}
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm border p-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
              
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-500 text-white rounded-md px-4 py-2 hover:bg-teal-600 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingTask ? 'Update' : 'Add'}
                </button>
                {editingTask && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-200 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
          
          <div className="space-y-2">
            {subCategory.tasks.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No tasks yet. Add your first task above.
              </div>
            ) : (
              subCategory.tasks.map((task, index) => (
                <div 
                  key={task._id} 
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`flex justify-between items-center p-4 border rounded-lg cursor-move transition-colors
                    ${dragOverIndex === index ? 'bg-blue-50 border-teal-600' : 'bg-white border-gray-200'}
                    ${draggedTask === index ? 'opacity-50' : 'opacity-100'}
                  `}
                >
                  <div className="font-medium">
                    {task.taskTitle}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(task)}
                      className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};