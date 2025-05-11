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
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">Manage Subcategories</h3>
                <button 
                  onClick={() => navigate(`/admin/subcategories/${catId}/new`)}
                  className="bg-teal-500 text-white rounded-full px-4 py-2 hover:bg-teal-600"
                >
                  Add Subcategory
                </button>
              </div>
              
              <div className="space-y-2">
                {category.subCategory.map(subCat => (
                  <div key={subCat._id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{subCat.subCategoryTitle}</h4>
                      <p className="text-sm text-gray-500">
                        {subCat.tasks.length} tasks
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(subCat)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteSubCategory(subCat._id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        Delete
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