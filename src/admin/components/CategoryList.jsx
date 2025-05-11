// CategoryList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, deleteCategory } from '../services/api';

export const CategoryList = ({ onEdit, refreshTrigger  }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, [refreshTrigger]);

  const handleDelete = async (catId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(catId);
        // setCategories(categories.filter(cat => cat._id !== catId));
        setRefreshTrigger(prev => !prev);
      } catch (err) {
        alert('Failed to delete category');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-teal-700">Categories</h2>
        <Link 
          to="/admin/categories/new" 
          className="bg-teal-500 text-white rounded-full px-4 py-2 hover:bg-teal-600"
        >
          Add Category
        </Link>
      </div>
      
      <div className="space-y-2">
        {categories.map(category => (
          <div key={category._id} className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">{category.categoryTitle}</h3>
              <p className="text-sm text-gray-500">
                {category.subCategory.length} subcategories
              </p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => onEdit(category)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(category._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              <Link 
                to={`/admin/subcategories/${category._id}`}
                className="text-teal-500 hover:text-teal-700"
              >
                View Subcategories
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};