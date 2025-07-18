const API_BASE = 'https://admin.mesudar.com/api/admin';
// const API_BASE = 'http://localhost:3000/api/admin';
// const API_BASE = 'http://localhost:3000';

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE}/categories`);
  return await response.json();
};

export const createCategory = async (title) => {
  const response = await fetch(`${API_BASE}/category/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryTitle: title })
  });
  return await response.json();
};

export const updateCategory = async (catId, title) => {
  const response = await fetch(`${API_BASE}/category/edit/${catId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryTitle: title })
  });
  return await response.json();
};

export const arrangeCategories = async (categoryOrder) => {
  const response = await fetch(`${API_BASE}/category/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({categoryOrder}),
  });
  return await response.json();
};



export const deleteCategory = async (catId) => {
  const response = await fetch(`${API_BASE}/category/delete/${catId}`, {
    method: 'DELETE'
  });
  return await response.json();
};


export const createSuggestion = async (suggestionData) => {
  const response = await fetch(`${API_BASE}/suggestion/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(suggestionData)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create suggestion');
  }
  
  return await response.json();
};

export const createSubCategory = async (catId, title) => {
  const response = await fetch(`${API_BASE}/subcategory/${catId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subCategoryTitle: title })
  });
  return await response.json();
};

export const updateSubCategory = async (catId, subCatId, title) => {
  const response = await fetch(`${API_BASE}/subcategory/${catId}/${subCatId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subCategoryTitle: title })
  });
  return await response.json();
};

export const arrangeSubCategory = async (catId, subCategoryOrder) => {
  const response = await fetch(`${API_BASE}/subcategory/${catId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subCategoryOrder })
  });
  return await response.json();
};



export const deleteSubCategory = async (catId, subCatId) => {
  const response = await fetch(`${API_BASE}/subcategory/${catId}/${subCatId}`, {
    method: 'DELETE'
  });
  return await response.json();
};

export const createTask = async (catId, subCatId, title) => {
  const response = await fetch(`${API_BASE}/task/${catId}/${subCatId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskTitle: title })
  });
  return await response.json();
};

export const updateTask = async (catId, subCatId, taskId, title) => {
  const response = await fetch(`${API_BASE}/task/${catId}/${subCatId}/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskTitle: title })
  });
  return await response.json();
};

export const arrangeTask = async (catId, subCatId, taskOrder) => {
  console.log({taskOrder})
  const response = await fetch(`${API_BASE}/task/${catId}/${subCatId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({taskOrder})
  });
  return await response.json();
};

export const deleteTask = async (catId, subCatId, taskId) => {
  const response = await fetch(`${API_BASE}/task/${catId}/${subCatId}/${taskId}`, {
    method: 'DELETE'
  });
  return await response.json();
};