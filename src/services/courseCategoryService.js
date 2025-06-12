import axios from './api';

export async function getCategories() {
  const response = await axios.get('/categories/');
  return response.data;
}

export async function getCoursesByCategory(categoryId) {
  const response = await axios.get('/courses/', {
    params: { category: categoryId },
  });
  console.log(response.data);
  return response.data; 
}
