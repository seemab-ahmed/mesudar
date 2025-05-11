// CategoriesPage.jsx
import { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { CategoryList } from '../components/CategoryList';
import { CategoryForm } from '../components/CategoryForm';

export const CategoriesPage = () => {
  const navigate = useNavigate();
  const [editingCategory, setEditingCategory] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const handleEdit = (category) => {
    setEditingCategory(category);
    navigate(`/admin/categories/edit/${category._id}`);
  };

  const handleSuccess = () => {
    setEditingCategory(null);
    setRefreshTrigger(prev => !prev);
    navigate('/admin/categories');
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={<CategoryList onEdit={handleEdit} />} 
      />
      <Route 
        path="/new" 
        element={<CategoryForm onSuccess={handleSuccess} />} 
      />
      <Route 
        path="/edit/:catId" 
        element={<CategoryForm category={editingCategory} onSuccess={handleSuccess} />} 
      />
    </Routes>
  );
};