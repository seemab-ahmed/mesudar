import { useState } from 'react';
import { createTask, updateTask } from '../services/api';

export const TaskForm = ({ categoryId, subCategoryId, task, onSuccess }) => {
  const [title, setTitle] = useState(task?.taskTitle || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (task) {
        await updateTask(categoryId, subCategoryId, task._id, title);
      } else {
        await createTask(categoryId, subCategoryId, title);
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-teal-700">
        {task ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      {error && <div className="text-red-500">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
            required
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-500 text-white rounded-full px-4 py-2 hover:bg-teal-600 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};