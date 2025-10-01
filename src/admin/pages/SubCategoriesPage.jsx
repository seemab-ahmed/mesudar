import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DraggableList from 'react-draggable-list';
import { 
  deleteSubCategory, 
  fetchCategories, 
  createSubCategory, 
  updateSubCategory,
  arrangeSubCategory 
} from '../services/api';

export const SubCategoriesPage = () => {
  const { catId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [subCategoryTitle, setSubCategoryTitle] = useState('');
  const [isArrange, setIsArrange] = useState(false);

  // Fetch categories and subcategories
  useEffect(() => {
    const loadData = async () => {
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
    loadData();
  }, [catId, refreshTrigger]);

  // Set subcategory title when editing
  useEffect(() => {
    if (editingSubCategory) {
      setSubCategoryTitle(editingSubCategory.subCategoryTitle);
    } else {
      setSubCategoryTitle('');
    }
  }, [editingSubCategory]);

  // Save the new subcategory order
  const handleArrangeSubCategory = async () => {
    try {
      const subCategoryOrder = category.subCategory?.map(sub => sub._id);
      console.log(subCategoryOrder);
      await arrangeSubCategory(catId, subCategoryOrder);
      setIsArrange(false);
      setRefreshTrigger(prev => !prev);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle subcategory creation/updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subCategoryTitle.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (editingSubCategory) {
        await updateSubCategory(catId, editingSubCategory._id, subCategoryTitle);
      } else {
        await createSubCategory(catId, subCategoryTitle);
      }
      setEditingSubCategory(null);
      setSubCategoryTitle('');
      setRefreshTrigger(prev => !prev);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle subcategory deletion
  const handleDeleteSubCategory = async (subCatId) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await deleteSubCategory(catId, subCatId);
        setRefreshTrigger(prev => !prev);
      } catch (err) {
        setError('Failed to delete subcategory');
      }
    }
  };

  // Custom draggable subcategory item component
  const SubCategoryItem = ({ item, itemSelected, dragHandleProps }) => {
    const subCategory = item;
    return (
      <div className={`flex justify-between items-center p-4 border rounded-lg mb-2 cursor-move
        ${itemSelected ? 'bg-blue-50 border-[#535252] shadow-md' : 'bg-white border-[#535252]'}`}
      {...dragHandleProps}>
        <div className="font-medium flex items-center">
          <span className="mr-2">
            ☰
          </span>
          {subCategory.subCategoryTitle}
          <span className="text-sm text-[#535252] ml-2">
            ({subCategory.tasks.length} tasks)
          </span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setEditingSubCategory(subCategory)}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 cursor-pointer"
          >
            Edit
          </button>
          <button 
            onClick={() => handleDeleteSubCategory(subCategory._id)}
            className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 cursor-pointer"
          >
            Delete
          </button>
          <Link
            to={`/admin/tasks/${category._id}/${subCategory._id}`}
            className="text-[#1f7333] hover:text-[#1f7333] px-2 py-1 rounded hover:bg-teal-50 cursor-pointer"
          >
            View Task
          </Link>
        </div>
      </div>
    );
  };

  // Handle list reordering
  const handleListChange = (newList) => {
    setIsArrange(true);
    setCategory({
      ...category,
      subCategory: newList
    });
  };

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!category) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-[#1f7333]">
        Subcategories for {category.categoryTitle}
      </h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Manage Subcategories</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder={editingSubCategory ? 'Edit Subcategory' : 'Add New Subcategory'}
                value={subCategoryTitle}
                onChange={(e) => setSubCategoryTitle(e.target.value)}
                className="flex-1 rounded-md border-[#535252] shadow-sm border p-4 focus:ring-[#1f7333] focus:border-[#1f7333]"
                required
              />
              
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1f7333] text-white rounded-md px-4 py-4 hover:bg-[#1f7333] disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingSubCategory ? 'Update Subcategory' : 'Add Subcategory'}
                </button>
                {editingSubCategory && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSubCategory(null);
                      setSubCategoryTitle('');
                    }}
                    className="bg-[#1f7333] text-white rounded-md px-4 py-2 hover:bg-[#1f7333]"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
          
          {!loading ? <div className="space-y-2">
            {category.subCategory.length === 0 ? (
              <div className="text-center py-4 text-[#535252]">
                No subcategories yet. Add your first subcategory above.
              </div>
            ) : (
              <DraggableList
                list={category.subCategory}
                itemKey="_id"
                template={SubCategoryItem}
                onMoveEnd={handleListChange}
                container={() => document.body}
                commonProps={{}}
              />
            )}
          </div> : <div className='flex justify-center w-full p-5'> Loading... </div>}
          
          {isArrange && (
            <div className="flex justify-end">
              <button 
                onClick={handleArrangeSubCategory}
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