// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import DraggableList from 'react-draggable-list';
// import { 
//   fetchCategories, 
//   createCategory, 
//   updateCategory, 
//   deleteCategory,
//   arrangeCategories
// } from '../services/api';

// export const CategoriesPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [categoryTitle, setCategoryTitle] = useState('');
//   const [isArrange, setIsArrange] = useState(false);

//   // Fetch categories
//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const data = await fetchCategories();
//         setCategories(data.categories);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadCategories();
//   }, [refreshTrigger]);

//   // Set category title when editing
//   useEffect(() => {
//     if (editingCategory) {
//       setCategoryTitle(editingCategory.categoryTitle);
//     } else {
//       setCategoryTitle('');
//     }
//   }, [editingCategory]);

//   // Save the new category order
//   const handleArrangeCategories = async () => {
//     try {
//       const categoryOrder = categories.map(cat => cat._id);
//       console.log(categoryOrder);
//       await arrangeCategories(categoryOrder);
//       setIsArrange(false);
//       setRefreshTrigger(prev => !prev);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Handle category creation/updating
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!categoryTitle.trim()) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       if (editingCategory) {
//         await updateCategory(editingCategory._id, categoryTitle);
//       } else {
//         await createCategory(categoryTitle);
//       }
//       setEditingCategory(null);
//       setCategoryTitle('');
//       setRefreshTrigger(prev => !prev);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle category deletion
//   const handleDeleteCategory = async (catId) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       try {
//         await deleteCategory(catId);
//         setRefreshTrigger(prev => !prev);
//       } catch (err) {
//         setError('Failed to delete category');
//       }
//     }
//   };

//   // Custom draggable category item component
//   const CategoryItem = ({ item, itemSelected, dragHandleProps }) => {
//     const category = item;
//     return (
//       <div className={`flex justify-between items-center p-4 border rounded-lg mb-2 cursor-move
//         ${itemSelected ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-gray-200'}`}
//       {...dragHandleProps}>
//         <div className="font-medium flex items-center">
//           <span className="mr-2">
//             ☰
//           </span>
//           {category.categoryTitle}
//           <span className="text-sm text-gray-500 ml-2">
//             ({category.subCategory.length} Items)
//           </span>
//         </div>
//         <div className="flex space-x-2">
//           <button 
//             onClick={() => setEditingCategory(category)}
//             className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 cursor-pointer"
//           >
//             <svg class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//                   <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
//                   <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
//                 </svg>
//           </button>
//           <button 
//             onClick={() => handleDeleteCategory(category._id)}
//             className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 cursor-pointer"
//           >
//            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
//                 </svg>
//           </button>
//           <Link
//             to={`/admin/subcategories/${category._id}`}
//             className="text-[#1f7333] hover:text-teal-700 px-2 py-1 rounded hover:bg-teal-50 cursor-pointer"
//           >
//             Sub Category
//           </Link>
//         </div>
//       </div>
//     );
//   };

//   // Handle list reordering
//   const handleListChange = (newList) => {
//     setIsArrange(true);
//     setCategories(newList);
//   };

//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6 space-y-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold text-teal-700">
//         Categories
//       </h2>
      
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-medium">Manage Categories</h3>
//           </div>
          
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex gap-4">
//               <input
//                 type="text"
//                 placeholder={editingCategory ? 'Edit Category' : 'Add New Category'}
//                 value={categoryTitle}
//                 onChange={(e) => setCategoryTitle(e.target.value)}
//                 className="flex-1 rounded-md border-gray-300 shadow-sm border p-4 focus:ring-[#1f7333] focus:border-[#1f7333]"
//                 required
//               />
              
//               <div className="flex space-x-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-[#1f7333] text-white rounded-md px-4 py-4 hover:bg-[#1f7333] disabled:opacity-50"
//                 >
//                   {loading ? 'Saving...' : editingCategory ? 'Update Category' : 'Add Category'}
//                 </button>
//                 {editingCategory && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setEditingCategory(null);
//                       setCategoryTitle('');
//                     }}
//                     className="bg-gray-200 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-300"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </div>
//             {error && <div className="text-red-500 text-sm">{error}</div>}
//           </form>
          
//           {!loading ? <div className="space-y-2">
//             {categories?.length === 0 ? (
//               <div className="text-center py-4 text-gray-500">
//                 No categories yet. Add your first category above.
//               </div>
//             ) : (
//               <DraggableList
//                 list={categories}
//                 itemKey="_id"
//                 template={CategoryItem}
//                 onMoveEnd={handleListChange}
//                 container={() => document.body}
//                 commonProps={{}}
//               />
//             )}
//           </div> : <div className='flex justify-center w-full p-5'> Loading... </div>}
          
//           {isArrange && (
//             <div className="flex justify-end">
//               <button 
//                 onClick={handleArrangeCategories}
//                 className="bg-[#1f7333] text-white rounded-md px-4 py-2 hover:bg-[#1f7333]"
//               >
//                 Save New Order
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DraggableList from 'react-draggable-list';
import { 
  fetchCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  arrangeCategories
} from '../services/api';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [isArrange, setIsArrange] = useState(false);

  // Fetch categories with better error handling
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchCategories();
        
        // Handle different possible response structures
        let fetchedCategories = [];
        if (Array.isArray(response)) {
          fetchedCategories = response;
        } else if (response && Array.isArray(response.categories)) {
          fetchedCategories = response.categories;
        } else if (response && Array.isArray(response.data)) {
          fetchedCategories = response.data;
        }

        if (!Array.isArray(fetchedCategories)) {
          throw new Error('Invalid categories data format');
        }

        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Failed to load categories:', err);
        setError(err.message || 'Failed to load categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [refreshTrigger]);

  // Set category title when editing
  useEffect(() => {
    if (editingCategory) {
      setCategoryTitle(editingCategory.categoryTitle || '');
    } else {
      setCategoryTitle('');
    }
  }, [editingCategory]);

  const handleArrangeCategories = async () => {
    try {
      const categoryOrder = categories.map(cat => cat._id);
      await arrangeCategories(categoryOrder);
      setIsArrange(false);
      setRefreshTrigger(prev => !prev);
    } catch (err) {
      setError(err.message || 'Failed to arrange categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryTitle.trim()) return;

    setLoading(true);
    setError(null);

    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id,  categoryTitle );
      } else {
        await createCategory(categoryTitle );
      }
      setEditingCategory(null);
      setCategoryTitle('');
      setRefreshTrigger(prev => !prev);
    } catch (err) {
      setError(err.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(catId);
        setRefreshTrigger(prev => !prev);
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  const CategoryItem = ({ item, itemSelected, dragHandleProps }) => {
    const category = item;
    return (
      <div 
        className={`flex justify-between items-center p-4 border rounded-lg mb-2 cursor-move 
          ${itemSelected ? 'bg-blue-50 border-[#535252] shadow-md' : 'bg-white border-[#535252]'}`} 
        {...dragHandleProps}
      >
        <div className="font-medium flex items-center">
          <span className="mr-2">☰</span>
          {category.categoryTitle}
          <span className="text-sm text-[#535252] ml-2">({category.subCategory?.length || 0} Items)</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setEditingCategory(category)}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"/>
              <path d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"/>
            </svg>
          </button>

          <button 
            onClick={() => handleDeleteCategory(category._id)}
            className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 2L9 3H3v2h18V3h-6l-1-1h-4zM4.365 7l1.703 15h11.863l1.703-15H4.365z"/>
            </svg>
          </button>

          <Link
            to={`/admin/subcategories/${category._id}`}
            className="text-[#1f7333] hover:text-teal-700 px-2 py-1 rounded hover:bg-teal-50 cursor-pointer"
          >
            Sub Category
          </Link>
        </div>
      </div>
    );
  };

  const handleListChange = (newList) => {
    setIsArrange(true);
    setCategories(newList);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-[#1f7333]">Categories</h2>

      <div className="bg-white rounded-lg shadow p-6 border-[#1f7333] border">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder={editingCategory ? 'Edit Category' : 'Add New Category'}
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              className="flex-1 rounded-md border-[#535252] shadow-sm border p-4 focus:ring-[#1f7333] focus:border-[#1f7333]"
              required
            />

            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1f7333] text-white rounded-md px-4 py-4 hover:bg-[#1f7333] disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingCategory ? 'Update Category' : 'Add Category'}
              </button>
              {editingCategory && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory(null);
                    setCategoryTitle('');
                  }}
                  className="bg-gray-200 text-[#535252] rounded-md px-4 py-2 hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <div className="space-y-4 mt-6">
          {loading ? (
            <div className="flex justify-center w-full p-5">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No categories found. Add your first category above.
            </div>
          ) : (
            <>
              <DraggableList
                list={categories}
                itemKey="_id"
                template={CategoryItem}
                onMoveEnd={handleListChange}
                container={() => document.body}
                commonProps={{}}
              />
              {/* Fallback rendering for debugging */}
              {categories.length > 0 && (
                <div className="hidden">
                  <h3>Debug Data:</h3>
                  <pre>{JSON.stringify(categories, null, 2)}</pre>
                </div>
              )}
            </>
          )}
        </div>

        {isArrange && (
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleArrangeCategories}
              className="bg-[#1f7333] text-white rounded-md px-4 py-2 hover:bg-[#1f7333]"
            >
              Save New Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};