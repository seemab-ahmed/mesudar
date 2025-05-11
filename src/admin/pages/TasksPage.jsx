// TasksPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { deleteTask, fetchCategories } from '../services/api';
import { TaskForm } from '../components/TaskForm';

export const TasksPage = () => {
  const { catId, subCatId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

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

  const handleEdit = (task) => {
    setEditingTask(task);
    navigate(`/admin/tasks/${catId}/${subCatId}/edit/${task._id}`);
  };

  const handleSuccess = () => {
    setEditingTask(null);
    setRefreshTrigger(prev => !prev);
    navigate(`/admin/tasks/${catId}/${subCatId}`);
  };

  const handleDeleteTask = async (taskId) => {
  if (window.confirm('Are you sure you want to delete this task?')) {
    try {
      await deleteTask(catId, subCatId, taskId);
      setRefreshTrigger(prev => !prev);
    } catch (err) {
      alert('Failed to delete task');
    }
  }
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!category || !subCategory) return <div>Not found</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-teal-700">
        Tasks for {subCategory.subCategoryTitle}
      </h2>
      
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">Manage Tasks</h3>
                <button 
                  onClick={() => navigate(`/admin/tasks/${catId}/${subCatId}/new`)}
                  className="bg-teal-500 text-white rounded-full px-4 py-2 hover:bg-teal-600"
                >
                  Add Task
                </button>
              </div>
              
              <div className="space-y-2">
                {subCategory.tasks.map(task => (
                  <div key={task._id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{task.taskTitle}</h4>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(task)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        Delete
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          } 
        />
        <Route 
          path="/new" 
          element={<TaskForm categoryId={catId} subCategoryId={subCatId} onSuccess={handleSuccess} />} 
        />
        <Route 
          path="/edit/:taskId" 
          element={<TaskForm categoryId={catId} subCategoryId={subCatId} task={editingTask} onSuccess={handleSuccess} />} 
        />
      </Routes>
    </div>
  );
};