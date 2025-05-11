// CategoryForm.jsx
import { useState } from 'react';
import { createCategory, updateCategory } from '../services/api';

export const CategoryForm = ({ category, onSuccess }) => {
  const [title, setTitle] = useState(category?.categoryTitle || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (category) {
        await updateCategory(category._id, title);
      } else {
        await createCategory(title);
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
        {category ? 'Edit Category' : 'Add New Category'}
      </h2>
      
      {error && <div className="text-red-500">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Category Title
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