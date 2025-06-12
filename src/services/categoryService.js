import axios from './api';

export async function getCategories() {
  const response = await axios.get('/categories/');
  return response.data;
}
