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
        {categories?.map(category => (
          <div key={category._id} className="transition-all ease-in-out duration-500 hover:bg-[#13ae8d8c] group flex justify-between items-center p-4 border rounded-lg flex-col gap-3  sm:flex-row">
            <div className='flex items-center sm:flex-row flex-col '>
              <h3 className="font-medium">{category.categoryTitle}</h3>
              <p className="text-sm text-gray-500">
                {category.subCategory.length} subcategories
              </p>
            </div>
            <div className="flex  space-x-2">
              <button 
                onClick={() => onEdit(category)}
                className="text-blue-500 hover:text-blue-700 sm:opacity-0 sm:group-hover:opacity-[1] transition-all ease-in-out duration-500"
              >
                <svg class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                </svg>

                {/* Edit */}
              </button>
              <button 
                onClick={() => handleDelete(category._id)}
                className="text-red-500 hover:text-red-700 sm:opacity-0 sm:group-hover:opacity-[1] transition-all ease-in-out duration-500 "
              >
               <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                </svg>

                {/* Delete */}
              </button>
              <Link 
                to={`/admin/subcategories/${category._id}`}
                className="text-teal-500 hover:text-teal-700"
              >
                Subcategories
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};