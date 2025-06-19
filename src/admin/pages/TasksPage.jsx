import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DraggableList from 'react-draggable-list';
import { 
  deleteTask, 
  fetchCategories, 
  createTask, 
  updateTask, 
  arrangeTask 
} from '../services/api';

export const TasksPage = () => {
  const { catId, subCatId } = useParams();
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [isArrange, setIsArrange] = useState(false);

  // Fetch categories and tasks
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

  // Set task title when editing
  useEffect(() => {
    if (editingTask) {
      setTaskTitle(editingTask.taskTitle);
    } else {
      setTaskTitle('');
    }
  }, [editingTask]);

  // Save the new task order
  const handleArrangeTask = async () => {
    try {
      const taskOrder = subCategory.tasks?.map(task => task._id);
      await arrangeTask(catId, subCatId, taskOrder);
      setIsArrange(false);
      setRefreshTrigger(prev => !prev);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle task creation/updating
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
      setEditingTask(null);
      setTaskTitle('');
      setRefreshTrigger(prev => !prev);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle task deletion
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

  // Custom draggable task item component
  const TaskItem = ({ item, itemSelected, dragHandleProps }) => {
    const task = item;
    return (
      <div className={`flex justify-between items-center p-4 border rounded-lg mb-2 cursor-move
        ${itemSelected ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-gray-200'}`}
      {...dragHandleProps}>
        <div className="font-medium flex items-center ">
          <span className="mr-2">
            ☰
          </span>
          {task.taskTitle}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setEditingTask(task)}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 cursor-pointer"
          >
            <svg class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                </svg>
          </button>
          <button 
            onClick={() => handleDeleteTask(task._id)}
            className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 cursor-pointer"
          >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                </svg>
          </button>
        </div>
      </div>
    );
  };

  // Handle list reordering
  const handleListChange = (newList) => {
    setIsArrange(true);
    setSubCategory({
      ...subCategory,
      tasks: newList
    });
  };

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!subCategory) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-[#1f7333]">
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
                className="flex-1 rounded-md border-[#535252] shadow-sm border p-4 focus:ring-[#1f7333] focus:border-[#1f7333]"
                required
              />
              
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1f7333] text-white rounded-md px-4 py-4 hover:bg-[#1f7333] disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Add Task'}
                </button>
                {editingTask && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTask(null);
                      setTaskTitle('');
                    }}
                    className="bg-gray-200 text-gray-700 rounded-md px-4 py-2 hover:bg-[#535252]"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
          
         {!loading ? <div className="space-y-2">
            {subCategory.tasks.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No tasks yet. Add your first task above.
              </div>
            ) : (
              <DraggableList
                list={subCategory.tasks}
                itemKey="_id"
                template={TaskItem}
                onMoveEnd={handleListChange}
                container={() => document.body}
                commonProps={{}}
              />
            )}
          </div> : <div className='flex justify-center w-full p-5'> Loading... </div>}
          
          {isArrange && (
            <div className="flex justify-end">
              <button 
                onClick={handleArrangeTask}
                className="bg-[#1f7333] text-white rounded-md px-4 py-2 hover:bg-[#1f7333]"
              >
                Save New Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};