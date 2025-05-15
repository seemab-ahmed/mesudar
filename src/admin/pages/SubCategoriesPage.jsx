// SubCategoriesPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { deleteSubCategory, fetchCategories } from '../services/api';
import { SubCategoryForm } from '../components/SubCategoryForm';

export const SubCategoriesPage = () => {
  const { catId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await fetchCategories();
        const foundCategory = data.categories.find(cat => cat._id === catId);
        if (foundCategory) {
          setCategory(foundCategory);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCategory();
  }, [catId, refreshTrigger]);

  const handleEdit = (subCategory) => {
    setEditingSubCategory(subCategory);
    navigate(`/admin/subcategories/${catId}/edit/${subCategory._id}`);
  };

  const handleSuccess = () => {
    setEditingSubCategory(null);
    setRefreshTrigger(prev => !prev);
    navigate(`/admin/subcategories/${catId}`);
  };

  const handleDeleteSubCategory = async (subCatId) => {
  if (window.confirm('Are you sure you want to delete this subcategory?')) {
    try {
      await deleteSubCategory(catId, subCatId);
      setRefreshTrigger(prev => !prev);
    } catch (err) {
      alert('Failed to delete subcategory');
    }
  }
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!category) return <div>Category not found</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-teal-700">
        Subcategories for {category.categoryTitle}
      </h2>
      
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                <p className="text-xl font-medium">Manage Subcategories</p>
                <button 
                  onClick={() => navigate(`/admin/subcategories/${catId}/new`)}
                  className="bg-teal-500 text-white rounded-full px-4 py-2 hover:bg-teal-600"
                >
                  Add Subcategory
                </button>
              </div>
              
              <div className="space-y-2">
                {category.subCategory.map(subCat => (
                  <div key={subCat._id} className="transition-all ease-in-out duration-500 hover:bg-[#eee] group flex justify-between items-center p-6 border rounded-lg flex-col gap-3  sm:flex-row">
                    <div className='sm:items-start items-center flex flex-col' >
                      <p className="font-medium">{subCat.subCategoryTitle}</p>
                      <p className="text-sm text-gray-500">
                        {subCat.tasks.length} tasks
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(subCat)}
                        className="text-blue-500 hover:text-blue-700 sm:opacity-0 sm:group-hover:opacity-[1] transition-all ease-in-out duration-500"
                      >
                         <svg class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                           <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                         </svg>
                        {/* Edit */}
                      </button>
                      <button 
                        onClick={() => handleDeleteSubCategory(subCat._id)}
                        className="text-red-500 hover:text-red-700 sm:opacity-0 sm:group-hover:opacity-[1] transition-all ease-in-out duration-500"
                    >
                       <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                       </svg>
                        {/* Delete */}
                    </button>
                      <button 
                        onClick={() => navigate(`/admin/tasks/${catId}/${subCat._id}`)}
                        className="text-teal-500 hover:text-teal-700"
                      >
                        View Tasks
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
          element={<SubCategoryForm categoryId={catId} onSuccess={handleSuccess} />} 
        />
        <Route 
          path="/edit/:subCatId" 
          element={<SubCategoryForm categoryId={catId} subCategory={editingSubCategory} onSuccess={handleSuccess} />} 
        />
      </Routes>
    </div>
  );
};